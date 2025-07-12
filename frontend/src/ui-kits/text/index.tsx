import { Typography } from '@mui/material';
import { cn } from '../../utils/cn';

const headingBase = 'font-[600]';

const variants = {
  default: 'text-primaryText text-md',
  fieldError: 'text-[10px] sm:text-[14px] text-error font-secondary',

  // Headings
  H12: cn(headingBase, 'text-[10px] sm:text-[10px] md:text-[12px] lg:text-[12px]'),
  H14: cn(headingBase, 'text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px]'),
  H16: cn(headingBase, 'text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]'),
  H18: cn(headingBase, 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]'),
  H20: cn(headingBase, 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]'),
  H22: cn(headingBase, 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]'),

  H24: cn(headingBase, 'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-7'),
  H26: cn(
    headingBase,
    'text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-6 md:leading-8'
  ),
  H28: cn(headingBase, 'text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-8'),
  H32: cn(headingBase, 'text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] leading-7'),
  H30: cn(headingBase, 'text-[20px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-7'),
  H34: cn(headingBase, 'text-[22px] sm:text-[24px] md:text-[28px] lg:text-[34px] leading-8'),
  H36: cn(headingBase, 'text-[24px] sm:text-[26px] md:text-[30px] lg:text-[36px] leading-8'),
  H40: cn(
    headingBase,
    'text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] leading-7 sm:leading-10'
  ),
  H48: cn(headingBase, 'text-[24px] sm:text-[32px] md:text-[36px] lg:text-[48px] leading-12'),

  // Descriptions
  D10: 'text-[8px] lg:text-[10px]',
  D12: 'text-[10px] lg:text-[12px]',
  D14: 'text-[12px] lg:text-[14px]',
  D16: 'text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]',
  D18: 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px]',
  D20: 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]',
  D22: 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-5 sm:leading-7',
  D24: 'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-7',
  D26: 'text-[19px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-7',
  D28: 'text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] leading-7',
  D30: 'text-[20px] sm:text-[26px] md:text-[28px] lg:text-[30px] leading-7',
  D32: 'text-[22px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-8',
};

// Define the variant type based on the keys of variants
export type VariantType = keyof typeof variants;

// Define props for the Text component
interface TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: VariantType;
  onClick?: () => void;
  style?: any;
}

export const Text: React.FC<TextProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  style,
  ...rest
}) => {
  const combinedClass = cn(variants.default, variants[variant], className);

  return (
    <Typography className={combinedClass} onClick={onClick} style={style} {...rest}>
      {children}
    </Typography>
  );
};
