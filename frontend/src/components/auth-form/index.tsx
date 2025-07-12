import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { UITextInput } from '../../ui-kits/text-input';
import UIButton from '../../ui-kits/button';
import { Text } from '../../ui-kits/text';
import { Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';

interface FieldConfig {
  name: string;
  title: string;
  placeHolder: string;
  type?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  required?: boolean;
}

interface AuthFormWrapperProps {
  title: string;
  fields: FieldConfig[];
  initialValues: Record<string, any>;
  validationSchema: any;
  onSubmit: (values: any) => void;
  submitButtonText: string;
  loadingText: string;
  bottomText: React.ReactNode;
  isLoading: boolean;
}

export const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  submitButtonText,
  loadingText,
  bottomText,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const { values, errors, touched, isValid, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });

  const formikErrors: any = errors;

  const handleTogglePassword = (field: string) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Box className="min-h-screen w-full flex items-center justify-center p-4">
      <Paper elevation={3} className="p-8 w-full max-w-md bg-white">
        <Text variant="H20" className="text-center mb-6">
          {title}
        </Text>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(field => {
            const isPassword = field.type === 'password';
            const value = values[field.name];
            return (
              <UITextInput
                key={field.name}
                name={field.name}
                title={field.title}
                type={isPassword && showPassword[field.name] ? 'text' : field.type}
                placeHolder={field.placeHolder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched[field.name] && formikErrors[field.name] ? formikErrors[field.name] : ''
                }
                required={field.required}
                startIcon={field.startIcon}
                endIcon={
                  isPassword ? (
                    <Box
                      onClick={() => handleTogglePassword(field.name)}
                      className="cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Box>
                  ) : (
                    field.endIcon
                  )
                }
              />
            );
          })}
          <UIButton
            type="submit"
            className="mt-6 w-full"
            disabled={!isValid}
            title={isLoading ? loadingText : submitButtonText}
          />
          <Box className="text-center mt-4">{bottomText}</Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthFormWrapper;
