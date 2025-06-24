import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, TextField, Box, Button } from '@mui/material';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPhotos = async () => {
    try {        
        const url = search
      ? `${process.env.REACT_APP_API_URL}/photos?q=${search}`
      : `${process.env.REACT_APP_API_URL}/photos`;
      console.log('Fetching photos from:', url);
      
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        // withCredentials: true
      });
      console.log('Fetched photos:', res.data);
      
      setPhotos(res.data.data || []); // <-- fix here
    } catch (err) {
      console.error('Failed to fetch photos:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // search functionality
//   const searchPhotos = async () => {
//   try {
//     const res = await axios.get(
//       `${process.env.REACT_APP_API_URL}/photos${search ? `/search?q=${search}` : ''}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }
//     );
//     setPhotos(res.data);
//   } catch (err) {
//     console.error('Failed to fetch photos:', err);
//   } finally {
//     setLoading(false);
//   }
// };


  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" gap={2} mb={3}>
  <TextField
    label="Search Photos"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && fetchPhotos()}
    fullWidth
  />
  <Button variant="outlined" onClick={fetchPhotos}>
    Search
  </Button>
</Box>

        <Typography variant="h4" gutterBottom>
          Your Photos
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {photos?.map((photo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photo._id}>
                <PhotoCard photo={photo} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
