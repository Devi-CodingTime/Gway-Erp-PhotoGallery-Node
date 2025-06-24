import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PhotoCard from '../components/PhotoCard';

const AlbumPhotosPage = () => {
  const { id: albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Album ID:", albumId);
  
  const fetchAlbumPhotos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/photos/${albumId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // const filteredPhotos = res.data.filter((p) => p.albumId === albumId);
      setPhotos(res.data);

      // Optionally fetch album title
      // const albumRes = await axios.get(`${process.env.REACT_APP_API_URL}/albums/${albumId}`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });
      // setAlbumTitle(albumRes.data.title);
    } catch (err) {
      console.error('Error loading album photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumPhotos();
  }, [albumId]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
         Your Album Photos
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : photos.length === 0 ? (
          <Box mt={2}>
            <Typography>No photos found in this album.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {photos.map((photo) => (
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

export default AlbumPhotosPage;
