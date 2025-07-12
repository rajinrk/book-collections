import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { asyncHandler } from '../utils/commonFunctions';

export interface Routes {
  path: string;
  router: Router;
}

class AuthRoutes implements Routes {
  public path = '/auth';
  public router = Router();
  public controller = AuthController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      asyncHandler(this.controller.register)
    );
    this.router.post(`${this.path}/login`, asyncHandler(this.controller.login));
  }
}

export default AuthRoutes;
