import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email,
        password,
        name,
      });
      setSuccess('Registration successful. You can now login.');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
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
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
        <p className="small fw-bold mt-2 pt-1 mb-2">
          Already have an account?{' '}
          <Link to="/" className="link-danger">
            Login
          </Link>
        </p>
      </Box>
    </Container>
  );
};

export default RegisterPage;
