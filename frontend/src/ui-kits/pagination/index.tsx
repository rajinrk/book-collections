import React from 'react';
import { Box, Pagination } from '@mui/material';

import { cn } from '../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  containerClass?: string;
}

export const UIPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  containerClass,
}) => {
  const handleChange = (_: any, value: number) => {
    onPageChange(value);
  };

  if (totalPages <= 1) return null;

  return (
    <Box className={cn('flex items-center justify-center gap-4 mt-6', containerClass)}>
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        color="secondary"
        onChange={handleChange}
        className="mt-4"
      />
    </Box>
  );
};
