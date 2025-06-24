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
import Footer from '../components/Footer';

const UploadPage = () => {
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState('');
  const [multiFiles, setMultiFiles] = useState([]);
  const [multiCaptions, setMultiCaptions] = useState(['']);
  const [multiLoading, setMultiLoading] = useState(false);
  const [multiSuccessMsg, setMultiSuccessMsg] = useState('');
  const [multiErrorMsg, setMultiErrorMsg] = useState('');

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

  const handleMultiFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setMultiFiles(files);
    setMultiCaptions(Array(files.length).fill(''));
  };

  const handleMultiCaptionChange = (idx, value) => {
    setMultiCaptions((prev) => {
      const arr = [...prev];
      arr[idx] = value;
      return arr;
    });
  };

  const handleMultiUpload = async () => {
    if (!multiFiles.length || !albumId) {
      setMultiErrorMsg('Please select files and an album');
      return;
    }
    const formData = new FormData();
    multiFiles.forEach((file) => formData.append('photos', file));
    formData.append('albumId', albumId);
    multiCaptions.forEach((caption) => formData.append('captions', caption));

    setMultiLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/photos/upload-multiple`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMultiSuccessMsg('Photos uploaded successfully');
      setMultiErrorMsg('');
      setMultiFiles([]);
      setMultiCaptions(['']);
    } catch (err) {
      setMultiErrorMsg('Upload failed');
    } finally {
      setMultiLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Upload Multiple Photos
        </Typography>

        {/* Multiple Upload Section */}
        <Box mt={6}>
          {multiSuccessMsg && <Typography color="primary">{multiSuccessMsg}</Typography>}
          {multiErrorMsg && <Typography color="error">{multiErrorMsg}</Typography>}
          <Box display="flex" flexDirection="column" gap={2}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiFilesChange}
            />
            {multiFiles.length > 0 &&
              multiFiles.map((file, idx) => (
                <TextField
                  key={idx}
                  label={`Caption for ${file.name}`}
                  variant="outlined"
                  value={multiCaptions[idx] || ''}
                  onChange={(e) => handleMultiCaptionChange(idx, e.target.value)}
                  sx={{ mb: 1 }}
                />
              ))}
            <FormControl fullWidth>
              <InputLabel id="multi-album-select-label">Select Album</InputLabel>
              <Select
                labelId="multi-album-select-label"
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
              onClick={handleMultiUpload}
              disabled={multiLoading}
            >
              {multiLoading ? <CircularProgress size={24} /> : 'Upload Multiple'}
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default UploadPage;
