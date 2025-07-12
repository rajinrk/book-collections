import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ text = 'Please wait...', fullScreen }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-blue-900  ${
        fullScreen ? 'min-h-screen' : 'min-h-[200px]'
      }`}
    >
      <CircularProgress />
      {text && <p className="mt-4">{text}</p>}
    </div>
  );
};
