import { MenuItem, IconButton, Menu, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthHeaderProps {
  logout: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ logout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: { label: string; path?: string; onClick?: () => void }) => {
    if (action.onClick) action.onClick();
    if (action.path) navigate(action.path);
    handleMenuClose();
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { label: 'Logout', onClick: logout, icon: <LogoutIcon fontSize="small" /> },
  ];

  return (
    <div className="flex items-center gap-4">
      {/* Menu Icon */}
      <IconButton onClick={handleMenuOpen} sx={{ color: 'black' }}>
        <MenuIcon />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map(item => (
          <MenuItem key={item.label} onClick={() => handleMenuAction(item)}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
