import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAlbums = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/albums`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAlbums(res.data.albums || []); // <-- fix here
    } catch (err) {
      console.error('Failed to fetch albums:', err);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleUpload = async () => {
    if (!file || !albumId) {
      setErrorMsg('Please select a file and an album');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    formData.append('albumId', albumId);

    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/photos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessMsg('Photo uploaded successfully');
      setErrorMsg('');
      setFile(null);
      setCaption('');
      setAlbumId('');
    } catch (err) {
      setErrorMsg('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Upload a Photo
        </Typography>

        {successMsg && <Typography color="primary">{successMsg}</Typography>}
        {errorMsg && <Typography color="error">{errorMsg}</Typography>}

        <Box display="flex" flexDirection="column" gap={2}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <TextField
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="album-select-label">Select Album</InputLabel>
            <Select
              labelId="album-select-label"
              value={albumId}
              label="Select Album"
              onChange={(e) => setAlbumId(e.target.value)}
            >
              {albums?.map((album) => (
                <MenuItem key={album._id} value={album._id}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default UploadPage;
