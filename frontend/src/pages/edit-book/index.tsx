import React, { useEffect } from 'react';
import BookForm from '../../components/book-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookRequest } from '../../services/redux/slices';
import { Loader } from '../../components';
import { getBookLoading, getBookSuccessCode } from '../../services/redux/selectors';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '../../constants/screen-path';

const EditBook: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getBookLoading);
  const success = useSelector(getBookSuccessCode);

  const handleSubmit = (values: any) => {
    const payload = { ...values, year: Number(values?.year) };
    dispatch(updateBookRequest(payload));
  };

  useEffect(() => {
    if (success === 'BOOK_UPDATED') {
      navigate(SCREEN_PATH.dashboard);
    }
  }, [success]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return <BookForm onSubmit={handleSubmit} submitButtonText="Save Changes" title="Edit Book" />;
};

export default EditBook;
