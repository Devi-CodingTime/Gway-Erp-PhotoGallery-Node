import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      width: '100%',
      bgcolor: 'primary.main',
      color: 'white',
      py: 2,
      mt: 6,
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 1201,
    }}
  >
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Google Photos Clone &mdash; Made with ❤️
    </Typography>
  </Box>
);

export default Footer;
