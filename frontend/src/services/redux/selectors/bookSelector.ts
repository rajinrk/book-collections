import type { RootState } from '../store';

export const getBookLoading = (state: RootState) => state?.book?.isLoading;
export const getBookSuccessCode = (state: RootState) => state?.book?.successCode;
export const getBookErrorCode = (state: RootState) => state?.book?.errorCode;
export const getCurrBook = (state: RootState) => state?.book?.currentBook;
export const getBookList = (state: RootState) => state?.book?.books;
export const getBookCurrentPage = (state: RootState) => state?.book?.currentPage;
export const getBookTotalPage = (state: RootState) => state?.book?.totalPages;
