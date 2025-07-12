import type React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
