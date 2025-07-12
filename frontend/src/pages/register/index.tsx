import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest, resetauthStatusCode } from '../../services/redux/slices';
import {
  getAuthErrorCode,
  getAuthLoading,
  getAuthSuccessCode,
} from '../../services/redux/selectors';
import { Loader } from '../../components/loader';
import { Text } from '../../ui-kits';
import { useToastMessage } from '../../hooks';
import AuthFormWrapper from '../../components/auth-form';
import { Mail, Lock } from 'lucide-react';
import * as Yup from 'yup';

const registerFields = [
  {
    name: 'email',
    title: 'Email',
    placeHolder: 'Enter your email',
    type: 'text',
    required: true,
    startIcon: <Mail className="text-gray-400" size={20} />,
  },
  {
    name: 'password',
    title: 'Password',
    placeHolder: 'Enter your password',
    type: 'password',
    required: true,
    startIcon: <Lock size={20} />,
  },
  {
    name: 'confirmPassword',
    title: 'Confirm Password',
    placeHolder: 'Enter your password',
    type: 'password',
    required: true,
    startIcon: <Lock size={20} />,
  },
];

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMsg = useSelector(getAuthErrorCode);
  const successMsg = useSelector(getAuthSuccessCode);
  const isLoading = useSelector(getAuthLoading);

  useToastMessage({
    errorMsg,
    successMsg,
    resetFunction: resetauthStatusCode,
    successFunction: () => navigate('/login'),
  });

  if (isLoading) {
    return <Loader text="Registering..." fullScreen />;
  }

  return (
    <AuthFormWrapper
      title="Register"
      fields={registerFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => dispatch(registerRequest(values))}
      submitButtonText="Register"
      loadingText="Registering..."
      isLoading={isLoading}
      bottomText={
        <Text variant="D14">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </Text>
      }
    />
  );
};
