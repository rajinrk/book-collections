/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import BookForm from '../../components/book-form';
import { useDispatch, useSelector } from 'react-redux';
import { addBookRequest } from '../../services/redux/slices';
import { getBookLoading, getBookSuccessCode } from '../../services/redux/selectors';
import { Loader } from '../../components';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '../../constants/screen-path';

const AddBook: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getBookLoading);
  const success = useSelector(getBookSuccessCode);

  const handleSubmit = (values: any) => {
    const payload = { ...values, year: Number(values?.year) };
    delete payload._id;
    dispatch(addBookRequest(payload));
  };

  useEffect(() => {
    if (success === 'BOOK_CREATED') {
      navigate(SCREEN_PATH.dashboard);
    }
  }, [success]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return <BookForm onSubmit={handleSubmit} submitButtonText="Add Book" title="Add Book" />;
};

export default AddBook;
