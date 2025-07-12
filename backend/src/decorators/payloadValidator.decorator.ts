import { validate, ValidationError } from 'class-validator';import { plainToClass } from 'class-transformer';
import { ErrorResponse } from '../utils/response.utils';

export function validatePayload(dtoClass: any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const req = args[0];
      const res = args[1];
      try {
        // Decrypt req.body.data if it exists
        if (req.body?.data) {
          const data = JSON.parse(req.body?.data);
          req.body = data;
        }

        const payload =
          req.method === 'GET' ? transformQuery(req.query) : req.body;

        const errors: ValidationError[] = await validate(
          plainToClass(dtoClass, payload),
          {
            skipMissingProperties: false,
          }
        );
        if (errors && errors.length > 0) {
          const error =
            errors[0].children && errors[0].children.length > 0
              ? checkErrorForClassValidator(errors[0].children)
              : errors[0].constraints
              ? Object.values(errors[0].constraints)[0]
              : 'Validation error';

          if (error) throw new Error(error as string);
        }
        return originalMethod.apply(this, args);
      } catch (err: any) {
        console.log(err); // for development purpose
        res
          .status(400)
          .json(new ErrorResponse('VALIDATION_ERROR', err.message));
      }
    };

    return descriptor;
  };
}

export function transformQuery(data: any): any {
  if (!data) return null;

  const result: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let value = data[key];

      if (typeof value === 'string') {
        try {
          const parsedValue = JSON.parse(value);
          if (typeof parsedValue === 'object' && parsedValue !== null) {
            value = parsedValue;
          }
        } catch (error) {
          /* empty */
        }
      }

      if (!isNaN(value) && typeof value === 'string') {
        value = parseInt(value, 10);
      }

      result[key] = value;
    }
  }
  return result;
}

export function checkErrorForClassValidator(errors: ValidationError[]): string {
  if (!errors || errors.length === 0) return 'Validation error';
  const first = errors[0];
  if (
    first.value !== undefined &&
    first.children &&
    first.children.length > 0
  ) {
    return checkErrorForClassValidator(first.children);
  } else if (first.constraints) {
    const status_code = Object.values(first.constraints)[0];
    return status_code as string;
  } else {
    return 'Validation error';
  }
}
