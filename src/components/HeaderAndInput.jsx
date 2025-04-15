import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';



export default function HeaderAndInput({}) {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [roomDimensions, setRoomDimensions] = useState(null);
  const [scale, setScale] = useState(1);

  // Handler to capture input and create room dimensions
  const handleCreateRoom = () => {
    console.log('hello')
    if (roomWidth && roomHeight) {
      console.log('hello');
      const width = parseInt(roomWidth, 10);
      const height = parseInt(roomHeight, 10);

      // Get available screen size (80% of window to allow for padding, header, etc.)
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.6;

      // Target pixel size per foot
      const targetSize = 30;

      // Calculate initial dimensions
      const rawWidth = width * targetSize;
      const rawHeight = height * targetSize;

      // Calculate scale factor to make the room fit on screen
      const widthScale = maxWidth / rawWidth;
      const heightScale = maxHeight / rawHeight;
      const finalScale = Math.min(widthScale, heightScale, 1); // Don't upscale if not needed

      setRoomDimensions({ width, height });
      setScale(finalScale);
      console.log(roomDimensions);
    } else {
      alert('Please enter valid room dimensions.');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Room Planner
      </Typography>
      
      {/* Room Input Fields */}
      <TextField
        label="Room Width (in feet)"
        variant="outlined"
        type="number"
        value={roomWidth}
        onChange={(e) => setRoomWidth(e.target.value)}
        sx={{ marginBottom: 2, marginRight: 2 }}
      />
      <TextField
        label="Room Height (in feet)"
        variant="outlined"
        type="number"
        value={roomHeight}
        onChange={(e) => setRoomHeight(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      
      {/* Button to Create Room */}
      <Button variant="contained" color="primary" onClick={handleCreateRoom}>
        Create Room
      </Button>

      {/* Render Room if dimensions are available */}
      {roomDimensions && (
        <Box
          sx={{
            width: roomDimensions.width * 30 * scale,  // Multiplied for scaling
            height: roomDimensions.height * 30 * scale, // Multiplied for scaling
            border: '2px solid #000',
            marginTop: 4,
            position: 'relative',
            backgroundColor: '#f0f0f0',
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 24,
              color: '#333',
            }}
          >
            Room ({roomDimensions.width} x {roomDimensions.height})
          </Typography>
        </Box>
      )}
    </Box>
  );
}
