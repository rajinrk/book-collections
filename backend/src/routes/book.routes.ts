import { Router } from 'express';import BookController from '../controllers/book.controller';
import { asyncHandler } from '../utils/commonFunctions';

export interface Routes {
  path: string;
  router: Router;
}

class BookRoutes implements Routes {
  public path = '/books';
  public router = Router();
  public controller = BookController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, asyncHandler(this.controller.getAllBooks));
    this.router.post(
      `${this.path}/add-book`,
      asyncHandler(this.controller.addBook)
    );
    this.router.put(
      `${this.path}/edit-book`,
      asyncHandler(this.controller.editBook)
    );
    this.router.delete(
      `${this.path}/delete-book/:id`,
      asyncHandler(this.controller.deleteBook)
    );
  }
}

export default BookRoutes;
