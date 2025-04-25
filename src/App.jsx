import React, { useState } from 'react';
import { Button } from '@mui/material';

import InputSection from './components/InputSection';
import Room from './components/Room';
import ItemList from './components/ItemList';


function App() {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomLength, setRoomLength] = useState('');
  const [roomDimensions, setRoomDimensions] = useState(null)
  const [roomValid, setRoomValid] = useState(false);
  const [scale, setScale] = useState(1);
  const [curItemList, setCurItemList] = useState([]);

  const handleCreateRoom = () => {
    if (roomWidth && roomLength) {
      const width = parseInt(roomWidth, 10);
      const length = parseInt(roomLength, 10);

      // Get available screen size (80% of window to allow for padding, header, etc.)
      const maxWidth = window.innerWidth * 0.8;
      const maxLength = window.innerHeight * 0.6;

      // Target pixel size per foot
      const targetSize = 30;

      // Calculate initial dimensions
      const rawWidth = width * targetSize;
      const rawLength = length * targetSize;

      // Calculate scale factor to make the room fit on screen
      const widthScale = maxWidth / rawWidth;
      const lengthScale = maxLength / rawLength;
      const finalScale = Math.min(widthScale, lengthScale, 1) * 30; // Don't upscale if not needed

      setRoomDimensions({ width, length });
      setScale(finalScale);
      setRoomValid(true);
    } else {
      alert('Please enter valid room dimensions.');
    }
  };

  const handleAddItem = (newItem) => {
    setCurItemList(prev => [...prev, newItem]);
  };

  return (
    <div className='content'>
      <div className='user_input'>
        <ul>
      <InputSection 
            area='Room Width'
            prevVal={roomWidth}
            setFunction={setRoomWidth}
      />
      <InputSection 
            area='Room Length'
            prevVal={roomLength}
            setFunction={setRoomLength}
      />
         </ul>
       </div>
      <Button variant="contained" color="primary" onClick={handleCreateRoom}>
        Create Room!
      </Button>
      {roomValid && (
        <div>
        <Room
        roomDimensions={roomDimensions}
        scale={scale}
        curItemList={curItemList}
        />

        <ItemList 
        curList={curItemList}
        setCurList={setCurItemList}
        handleAddItem={handleAddItem} // Add this handler to pass down

        roomWidth={roomDimensions.width}
        roomHeight={roomDimensions.length}
        scale={scale}
        />
        </div>
      )}
     </div>
  );
}

export default App