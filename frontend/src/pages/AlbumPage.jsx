import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField,
  Box
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [newAlbumTitle, setNewAlbumTitle] = useState('');
const [creating, setCreating] = useState(false);

const handleCreateAlbum = async () => {
  if (!newAlbumTitle.trim()) return;
  setCreating(true);
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/albums`,
      { title: newAlbumTitle },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    setNewAlbumTitle('');
    fetchAlbums(); // refresh album list
  } catch (err) {
    console.error('Failed to create album:', err);
  } finally {
    setCreating(false);
  }
};


  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/albums`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAlbums(res.data.albums || []); // <-- fix here
    } catch (err) {
      console.error('Failed to load albums', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleOpenAlbum = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" gap={2} mb={3}>
        <TextField
            label="New Album Title"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
            fullWidth
        />
        <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAlbum}
            disabled={creating}
        >
            Create
        </Button>
        </Box>
        
        <Typography variant="h4" gutterBottom>
          Your Albums
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {albums.map((album) => (
              <Grid item xs={12} sm={6} md={4} key={album._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{album.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Created by: {album.createdBy?.email || 'You'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleOpenAlbum(album._id)}
                    >
                      View Photos
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        
      </Container>
    </>
  );
};

export default AlbumPage;
