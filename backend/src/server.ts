import express, { Application } from 'express';import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import AuthRoutes from './routes/auth.routes';
import BookRoutes from './routes/book.routes';
import { errorResponse } from './utils/response.utils';

dotenv.config();

class Server {
  public app: Application;
  private authRoutes = new AuthRoutes();
  private bookRoutes = new BookRoutes();
  private PORT = process.env.PORT || 5000;

  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
    this.setErrorHandling();
    this.connectDatabase();
  }

  private setMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setRoutes() {
    this.app.use('/api', this.authRoutes.router);
    this.app.use('/api', this.bookRoutes.router);
  }

  private setErrorHandling() {
    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.error(err.stack);
        errorResponse(
          res,
          'INTERNAL_SERVER_ERROR',
          err.message || 'Something went wrong!',
          500
        );
      }
    );
  }

  private connectDatabase() {
    mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
      });
  }

  public start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

const server = new Server();
server.start();
