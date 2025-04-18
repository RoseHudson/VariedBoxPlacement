import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { findCoords } from '../calcs';

export default function ItemList({curList, setCurList, handleAddItem, roomWidth, roomHeight, scale}) {
  const [name, setName] = useState('');
  const [verticalSize, setVerticalSize] = useState('');
  const [horizontalSize, setHorizontalSize] = useState('');

  const handleAdd = () => {
    // if (name && verticalSize && horizontalSize) {
    //   const newItem = {
    //     id: Date.now(),
    //     name,
    //     verticalSize: parseInt(verticalSize),
    //     horizontalSize: parseInt(horizontalSize),
    //     verticalPos: null,
    //     horizontalPos: null,
    //   };
    const foundCoords = findCoords(parseInt(verticalSize), parseInt(horizontalSize), roomWidth, roomHeight, curList);
    console.log(foundCoords);
    if (name && verticalSize && horizontalSize) {
      const newItem = {
        id: Date.now(),
        name,
        verticalSize: parseInt(verticalSize),
        horizontalSize: parseInt(horizontalSize),
        verticalPos: foundCoords.vert,
        horizontalPos: foundCoords.hor,
      };

      console.log(newItem);
      // console.log(curList);
      // console.log(`newItem: ${newItem}`);
      // console.log(`list: ${curList}`);
      
      handleAddItem(newItem); // Use handleAddItem to place the item in the room

      // setCurList(prev => [...prev, newItem]);
      setName('');
      setVerticalSize('');
      setHorizontalSize('');
    }
  };

  const handleDelete = (id) => {
    setCurList(prev => prev.filter(item => item.id !== id));
  };

  const isFormValid = name && verticalSize && horizontalSize;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Item
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Height"
          type="number"
          value={verticalSize}
          onChange={(e) => setVerticalSize(e.target.value)}
          fullWidth
        />
        <TextField
          label="Width"
          type="number"
          value={horizontalSize}
          onChange={(e) => setHorizontalSize(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!isFormValid}
        >
          Add
        </Button>
      </Box>

      <List>
        {curList.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${item.name} (${item.verticalSize}x${item.horizontalSize})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}