import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>
        {token ? (
          <Box>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate('/upload')}>Upload</Button>
            <Button color="inherit" onClick={() => navigate('/albums')}>Albums</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
