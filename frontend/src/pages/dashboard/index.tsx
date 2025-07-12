import React, { useEffect } from 'react';
import BookList from '../../components/book-list';
import type { Book } from '../../components/book-list';
import { Text, UIButton, UIPagination } from '../../ui-kits';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '../../constants/screen-path';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBookRequest,
  fetchBooksRequest,
  resetBookStatusCode,
  setCurrentBook,
} from '../../services/redux/slices';
import {
  getBookCurrentPage,
  getBookErrorCode,
  getBookList,
  getBookSuccessCode,
  getBookTotalPage,
} from '../../services/redux/selectors';
import { Search } from '../../components';
import { useToastMessage } from '../../hooks';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(getBookList);
  const currentPage = useSelector(getBookCurrentPage);
  const totalPage = useSelector(getBookTotalPage);

  const errorMsg = useSelector(getBookErrorCode);
  const successMsg = useSelector(getBookSuccessCode);

  const successFunction = () => {
    if (successMsg === 'BOOK_DELETED') {
      handleBook();
    }
  };

  useToastMessage({ errorMsg, successMsg, resetFunction: resetBookStatusCode, successFunction });

  const [search, setSearch] = React.useState('');

  const handleBook = (data?: any) => {
    const payload = {
      search,
      page: currentPage,
      ...data,
    };

    dispatch(fetchBooksRequest(payload));
  };

  const handleEdit = (book: Book) => {
    dispatch(setCurrentBook(book));
    navigate(`${SCREEN_PATH.edit_book}/${book._id}`);
  };

  const handleAdd = () => {
    navigate(SCREEN_PATH.add_book);
  };

  const handleDelete = (book: any) => {
    dispatch(deleteBookRequest(book));
  };

  const handlePagination = (page: number) => {
    handleBook({ page });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    handleBook({ search, page: 1 });
  }, [search]);

  return (
    <Box className="p-2 md:p-8 min-h-[90vh] flex flex-col">
      <Text variant="H28">Available Books</Text>

      <Box className="flex justify-between my-4 p-4 bg-white  rounded-lg flex-wrap gap-2">
        <Search value={search} onChange={handleSearch} placeholder="Search by title or author..." />
        {books.length !== 0 && <UIButton title="Add Book" onClick={handleAdd} />}
      </Box>

      {books.length === 0 ? (
        <Box className="flex flex-col items-center justify-center min-h-[300px]">
          <span style={{ fontSize: '3rem', marginBottom: '1rem' }} role="img" aria-label="Books">
            📚
          </span>
          <Text variant="H20" className="mb-4">
            No books found. Start by adding your first book!
          </Text>
          <UIButton title="Add Book" onClick={handleAdd} />
        </Box>
      ) : (
        <>
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
          <UIPagination
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={handlePagination}
            containerClass="mt-auto"
          />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
