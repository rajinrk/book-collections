import { Request, Response, NextFunction } from 'express';import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { errorResponse } from '../utils/response.utils';

export function checkAuth(
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
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(
          res,
          'UNAUTHORIZED',
          'Not authorized to access this route',
          401
        );
      }
      const token = authHeader.split(' ')[1];
      const jwtSecret: Secret = process.env.JWT_SECRET!;
      try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        // Attach user info to request for downstream use
        (req as any).user = decoded;
      } catch (err) {
        return errorResponse(
          res,
          'UNAUTHORIZED',
          'Not authorized to access this route',
          401
        );
      }
      return await originalMethod.apply(this, args);
    } catch (err) {
      return errorResponse(
        res,
        'UNAUTHORIZED',
        'Not authorized to access this route',
        401
      );
    }
  };
  return descriptor;
}
