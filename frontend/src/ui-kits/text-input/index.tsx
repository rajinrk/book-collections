import { Box, TextField, type CSSProperties, InputAdornment } from '@mui/material';
import type { ChangeEvent } from 'react';
import { Text, type VariantType } from '../text';
import { cn } from '../../utils/cn';

interface UITextInputProps {
  name?: string;
  title?: string;
  placeHolder?: string;
  error?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  variant?: VariantType;
  required?: boolean;
  alphabetOnly?: boolean;
  numberOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;
  containerClass?: string;
  titleClass?: string;
  inputClass?: string;
  inputStyle?: CSSProperties;
  readOnly?: boolean;
  value?: string | number | null;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: string;
}

export const UITextInput: React.FC<UITextInputProps> = ({
  name,
  title,
  label,
  placeHolder,
  value,
  error,
  onBlur,
  onChange,
  rows = 1,
  variant = 'D16',
  required = false,
  disabled,
  maxLength,
  containerClass = '',
  titleClass = '',
  inputClass = '',
  inputStyle,
  readOnly = false,
  numberOnly,
  startIcon,
  endIcon,
  type = 'text',
  ...rest
}) => {
  const singleRowHeight = '40px';
  const styles = {
    input: (style?: CSSProperties) => ({
      '& .MuiInputBase-root': {
        height: rows === 1 ? singleRowHeight : 'auto',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: 'white',
      },

      '& .Mui-disabled': {
        cursor: 'not-allowed',
      },
      ...style,
    }),
  };

  const validationRules = [{ condition: numberOnly, regex: /^[0-9]+$/ }];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (maxLength && newValue.length > maxLength) return;
    if (newValue.startsWith(' ')) return;

    const isValid = validationRules.some(
      ({ condition, regex }) => condition && (regex.test(newValue) || newValue === '')
    );

    if (onChange && (isValid || validationRules.every(({ condition }) => !condition))) {
      onChange(e);
    }
  };

  return (
    <Box className={cn('mt-2 w-full relative', containerClass)}>
      {title && (
        <Text variant={variant} className={cn('mb-1', titleClass)}>
          {title}
          {required && <span className="text-red-700">*</span>}
        </Text>
      )}

      {label && (
        <Text variant={'D10'} className={cn('mb-1 bg-white z-40 px-1 absolute -top-[7px] left-2')}>
          {label}
          {required && <span className="text-red-700">*</span>}
        </Text>
      )}
      <Box className="flex gap-2 w-full">
        <TextField
          id={name}
          required={required}
          name={name}
          variant="outlined"
          placeholder={disabled ? '-' : placeHolder}
          value={value}
          error={Boolean(error)}
          onChange={handleChange}
          sx={styles.input(inputStyle)}
          className={cn('w-full border-none bg-white', inputClass)}
          onBlur={onBlur}
          multiline={rows > 1}
          rows={rows}
          disabled={disabled}
          type={type}
          slotProps={{
            input: {
              style: { cursor: disabled ? 'no-drop' : 'auto' },
              readOnly: readOnly,
              startAdornment: startIcon ? (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ) : undefined,
              endAdornment: endIcon ? (
                <InputAdornment position="end">{endIcon}</InputAdornment>
              ) : undefined,
            },
          }}
          {...rest}
        />
      </Box>

      {error && (
        <Text variant="D14" className="mt-1 text-red-700">
          {error}
        </Text>
      )}
    </Box>
  );
};
