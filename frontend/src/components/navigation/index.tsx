import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getIsAuthenticated } from '../../services/redux/selectors';
import { PublicRoute } from '../public-route';
import { Login, Register } from '../../pages';

import { Header } from '../header';
import { Text } from '../../ui-kits';
import { ProtectedRoute } from '../protected-route';
import Dashboard from '../../pages/dashboard';
import { SCREEN_PATH } from '../../constants/screen-path';
import AddBook from '../../pages/add-book';
import EditBook from '../../pages/edit-book';

export const RootNavigation: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Box className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} />

        <Box className="flex-1 p-3 md:p-8">
          <Box className="border border-gray-200 bg-gradient-to-br from-blue-200 via-blue-50 to-purple-300 rounded-lg">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={<PublicRoute element={<Navigate to="/login" replace />} />}
              />
              <Route path={SCREEN_PATH.login} element={<PublicRoute element={<Login />} />} />
              <Route path={SCREEN_PATH.register} element={<PublicRoute element={<Register />} />} />

              {/* Protected Routes */}

              <Route
                path={SCREEN_PATH.dashboard}
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path={SCREEN_PATH.add_book}
                element={<ProtectedRoute element={<AddBook />} />}
              />
              <Route
                path={`${SCREEN_PATH.edit_book}/:id`}
                element={<ProtectedRoute element={<EditBook />} />}
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <Box className="flex items-center justify-center min-h-[400px]">
                    <Text variant="H32">404 - Page Not Found</Text>
                  </Box>
                }
              />
            </Routes>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
