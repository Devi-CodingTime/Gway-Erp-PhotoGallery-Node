import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/dashboard'; // Redirect to upload page after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Replace with your actual image filename
 const backgroundUrl = `${process.env.REACT_APP_API_URL}/photos/file/Google-Photos-logo.webp`
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm" sx={{ bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 2, py: 4 }}>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4">Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;