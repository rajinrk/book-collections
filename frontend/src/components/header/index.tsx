import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { AuthHeader } from '../auth-header';
import { useDispatch } from 'react-redux';
import { store } from '../../services/redux/store';
import { logout } from '../../services/redux/slices';
import { Text } from '../../ui-kits';

interface NavLinksProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAuthenticated, onLogout }) => {
  if (isAuthenticated) {
    return <AuthHeader logout={onLogout} />;
  }
};

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    store.dispatch({ type: 'USER_LOGOUT' });
  };

  return (
    <div className="w-full">
      <AppBar position="static">
        <Toolbar className="justify-between bg-white">
          <Text variant="H22">Book Collections</Text>
          <div className="space-x-2">
            <NavLinks isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
