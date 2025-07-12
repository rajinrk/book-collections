import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest, resetauthStatusCode } from '../../services/redux/slices';
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

const loginFields = [
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
];

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector(getAuthErrorCode);
  const successMsg = useSelector(getAuthSuccessCode);
  const isLoading = useSelector(getAuthLoading);

  useToastMessage({ errorMsg, successMsg, resetFunction: resetauthStatusCode });

  if (isLoading) {
    return <Loader text="Logging in..." fullScreen />;
  }

  return (
    <AuthFormWrapper
      title="Login"
      fields={loginFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => dispatch(loginRequest(values))}
      submitButtonText="Sign In"
      loadingText="Signing In..."
      isLoading={isLoading}
      bottomText={
        <Text variant="D14">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </Text>
      }
    />
  );
};
