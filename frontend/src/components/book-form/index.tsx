import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { UITextInput } from '../../ui-kits/text-input';
import UIButton from '../../ui-kits/button';
import { Text } from '../../ui-kits/text';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrBook } from '../../services/redux/selectors';
import { setCurrentBook } from '../../services/redux/slices';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface BookFormValues {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  year: string | number;
}

interface BookFormProps {
  onSubmit: (values: BookFormValues) => void;
  submitButtonText: string;
  title?: string;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, submitButtonText, title }) => {
  const currBook = useSelector(getCurrBook);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: BookFormValues = {
    _id: '',
    title: '',
    author: '',
    genre: '',
    year: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    genre: Yup.string().required('Genre is required'),
    year: Yup.number()
      .typeError('Year must be a number')
      .integer('Year must be an integer')
      .min(0, 'Year must be positive')
      .required('Year is required'),
  });

  const { values, handleBlur, handleChange, setValues, touched, dirty, errors, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit,
    });

  const handleNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (currBook) {
      setValues(currBook);
    }
    return () => {
      dispatch(setCurrentBook(null));
    };
  }, [currBook, setValues, dispatch]);

  return (
    <Box className="flex flex-col items-center justify-center min-h-[80vh] md:min-h-[60vh] my-10 p-2">
      <Box className="p-3 md:p-8 w-full max-w-md bg-white rounded-lg">
        <Box className="flex relative w-full justify-center">
          <ArrowLeft onClick={handleNavigate} className="absolute left-0 top-0" />
          {title && (
            <Text variant="H20" className="text-center mb-6">
              {title}
            </Text>
          )}
        </Box>

        <form className="space-y-4">
          <UITextInput
            name="title"
            title="Title"
            placeHolder="Enter book title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && typeof errors.title === 'string' ? errors.title : ''}
            required
          />
          <UITextInput
            name="author"
            title="Author"
            placeHolder="Enter author name"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.author && typeof errors.author === 'string' ? errors.author : ''}
            required
          />
          <UITextInput
            name="genre"
            title="Genre"
            placeHolder="Enter genre"
            value={values.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.genre && typeof errors.genre === 'string' ? errors.genre : ''}
            required
          />
          <UITextInput
            name="year"
            title="Year"
            placeHolder="Enter year"
            value={values.year}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.year && typeof errors.year === 'string' ? errors.year : ''}
            required
            numberOnly
          />
          <UIButton
            className="mt-6 w-full"
            disabled={!isValid || !dirty}
            title={submitButtonText}
            onClick={() => onSubmit(values)}
          />
        </form>
      </Box>
    </Box>
  );
};

export default BookForm;
