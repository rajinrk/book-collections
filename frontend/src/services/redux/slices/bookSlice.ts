import { createSlice } from '@reduxjs/toolkit';
import type { Book } from '../../../components';

interface BookState {
  isLoading: boolean;
  successCode: string | null;
  errorCode: string | null;
  books: Book[];
  total: number;
  currentPage: number;
  totalPages: number;
  currentBook: Book | null;
}

const initialState: BookState = {
  isLoading: false,
  successCode: null,
  errorCode: null,
  books: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  currentBook: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    resetBookStatusCode(state) {
      state.isLoading = false;
      state.successCode = null;
      state.errorCode = null;
    },
    fetchBooksRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },
    fetchBooksSuccess(state, action) {
      state.isLoading = false;
      state.books = action.payload.data.books;
      state.currentPage = action.payload.data.page;
      state.totalPages = action.payload.data.totalPages;
      state.errorCode = null;
    },
    fetchBooksFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },
    addBookRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },
    addBookSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.books.unshift(action.payload.data);
      state.errorCode = null;
    },
    addBookFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },
    updateBookRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },
    updateBookSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.books = state.books.map(book =>
        book?._id === action.payload.data._id ? action.payload.data : book
      );
      state.errorCode = null;
    },
    updateBookFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },
    deleteBookRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },
    deleteBookSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.books = state.books.filter(book => book._id !== action.payload.data.id);
      state.errorCode = null;
    },
    deleteBookFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },
  },
});

export const {
  resetBookStatusCode,
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  addBookRequest,
  addBookSuccess,
  addBookFailure,
  updateBookRequest,
  updateBookSuccess,
  updateBookFailure,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
  setCurrentBook,
} = bookSlice.actions;

export default bookSlice.reducer;
