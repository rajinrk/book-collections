import { errorResponse } from '../utils/response.utils';import { Request, Response, NextFunction } from 'express';

export function catchError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    const req: Request = args[0];
    const res: Response = args[1];
    const next: NextFunction = args[2];
    try {
      return await originalMethod.apply(this, args);
    } catch (error: any) {
      console.error(error);
      return errorResponse(
        res,
        'INTERNAL_SERVER_ERROR',
        error.message || 'Something went wrong',
        500
      );
    }
  };
  return descriptor;
}
