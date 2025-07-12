import { Request, Response } from 'express';
import Book from '../models/book.model';
import { errorResponse, successResponse } from '../utils/response.utils';
import { validatePayload } from '../decorators/payloadValidator.decorator';
import { BookDto } from '../dtos/book.dto';
import { catchError } from '../decorators/catchError.decorator';
import { checkAuth } from '../decorators/auth.decorator';

class BookController {
  @catchError
  static async getAllBooks(req: Request, res: Response) {
    const { search = '', page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    const searchRegex = new RegExp(search as string, 'i');
    const query = {
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
      ],
    };

    // If no search, match all
    const finalQuery = (search as string).trim() ? query : {};

    const [books, total] = await Promise.all([
      Book.find(finalQuery).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
      Book.countDocuments(finalQuery),
    ]);

    return successResponse(res, 'BOOKS_FETCHED', {
      books,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  }

  @checkAuth
  @catchError
  @validatePayload(BookDto)
  static async addBook(req: Request, res: Response) {
    const { title, author, genre, year } = req.body;
    if (!title || !author || !genre || !year) {
      return errorResponse(
        res,
        'BOOK_FIELDS_REQUIRED',
        'All fields are required.',
        400
      );
    }
    const book = new Book({ title, author, genre, year });
    await book.save();

    const resData = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      _id: book._id,
    };
    return successResponse(res, 'BOOK_CREATED', resData, 201);
  }

  @checkAuth
  @catchError
  @validatePayload(BookDto)
  static async editBook(req: Request, res: Response) {
    const { _id, title, author, genre, year } = req.body;
    const book = await Book.findByIdAndUpdate(
      _id,
      { title, author, genre, year },
      { new: true, runValidators: true }
    );

    if (!book) {
      return errorResponse(res, 'BOOK_NOT_FOUND', 'Book not found.', 404);
    }

    const resData = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
      _id: book._id,
    };
    return successResponse(res, 'BOOK_UPDATED', resData, 200);
  }

  @checkAuth
  @catchError
  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return errorResponse(res, 'BOOK_NOT_FOUND', 'Book not found.', 404);
    }
    return successResponse(
      res,
      'BOOK_DELETED',
      { message: 'Book deleted successfully.' },
      200
    );
  }
}

export default BookController;
