import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const PhotoCard = ({ photo }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={`${process.env.REACT_APP_API_URL}/photos/file/${photo.filename}`}
        alt={photo.caption || 'Uploaded photo'}
      />
      <CardContent>
        <Typography variant="body1">{photo.caption}</Typography>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
