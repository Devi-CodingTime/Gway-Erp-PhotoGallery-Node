import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Avatar, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  // Style for selected tab
  const selectedStyle = {
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>
        {token ? (
          <Box display="flex" alignItems="center">
            <Button
              sx={{
                mx: 0.5,
                ...(isActive('/dashboard') && selectedStyle),
              }}
              color="inherit"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              sx={{
                mx: 0.5,
                ...(isActive('/upload') && selectedStyle),
              }}
              color="inherit"
              onClick={() => navigate('/upload')}
            >
              Upload
            </Button>
            <Button
              sx={{
                mx: 0.5,
                ...(isActive('/albums') && selectedStyle),
              }}
              color="inherit"
              onClick={() => navigate('/albums')}
            >
              Albums
            </Button>
            {/* User Avatar and Menu */}
            <Box sx={{ ml: 2 }}>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : <span>U</span>}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Box>
                    <Typography variant="subtitle1">{user?.name || 'User'}</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        ) : (
          <Box>
            <Button
              sx={{
                mx: 0.5,
                ...(isActive('/') && selectedStyle),
              }}
              color="inherit"
              onClick={() => navigate('/')}
            >
              Login
            </Button>
            <Button
              sx={{
                mx: 0.5,
                ...(isActive('/register') && selectedStyle),
              }}
              color="inherit"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
