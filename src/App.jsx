import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

import HeaderAndInput from './components/HeaderAndInput';
import InputSection from './components/InputSection';
import Room from './components/Room';
import ItemList from './components/ItemList';
import { putInGrid, findCoords } from './calcs';


function App() {
  const [roomWidth, setRoomWidth] = useState('');
  const [roomLength, setRoomLength] = useState('');
  const [roomDimensions, setRoomDimensions] = useState(null)
  const [roomValid, setRoomValid] = useState(false);
  const [scale, setScale] = useState(1);
  const [curItemList, setCurItemList] = useState([]);
  const [nextPosition, setNextPosition] = useState({ x: 0, y: 0 });
  // const [newItem, setNewitem] = useState({id: Date.now(),
  //                                         name: null,
  //                                         verticalSize: null,
  //                                         horizontalSize: null,
  //                                         verticalPos: null,
  //                                         horizontalPos: null})

  const handleCreateRoom = () => {
    if (roomWidth && roomLength) {
      // console.log(roomLength);
      const width = parseInt(roomWidth, 10);
      const length = parseInt(roomLength, 10);

      // console.log(`width: ${width}`);
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
      // const finalScale = Math.min(widthScale, lengthScale, 1); // Don't upscale if not needed
      const finalScale = Math.min(widthScale, lengthScale, 1) * 30; // Don't upscale if not needed
      // const finalScale = 50;

      setRoomDimensions({ width, length });
      setScale(finalScale);
      setRoomValid(true);
    } else {
      alert('Please enter valid room dimensions.');
    }
  };

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  const handleAddItem = (newItem) => {
    // const roomWidth =  roomDimensions.width * 30 * scale;  // Multiplied for scaling
    // const roomHeight =  roomDimensions.length * 30 * scale; // Multiplied for scaling
    // console.log(findCoords(newItem, roomWidth, roomHeight, curItemList));

    
    // Update the list and the next available position
    // setCurItemList((prev) => [
    //   ...prev,
    //   { ...newItem},
    // ]);
    setCurItemList(prev => [...prev, newItem]);





    // Find the next available position for the new item
    // let newX = nextPosition.x;
    // let newY = nextPosition.y;

    // // Check for overlap with existing items, if overlap, move to the next position
    // let overlap = true;
    // while (overlap) {
    //   overlap = false;

    //   for (let item of curItemList) {
    //     // Check if the new item overlaps with any existing item
    //     const isOverlapping =
    //       newX < item.x + item.horizontalSize * 30 * scale &&
    //       newX + newItem.horizontalSize * 30 * scale > item.x &&
    //       newY < item.y + item.verticalSize * 30 * scale &&
    //       newY + newItem.verticalSize * 30 * scale > item.y;

    //     if (isOverlapping) {
    //       overlap = true;
    //       newX += 10; // Move item to the right by 10px
    //       newY = nextPosition.y; // Reset to top
    //       break;
    //     }
    //   }
    // }


    // // Update the next position (move to the next row if needed)
    // const newPosition =
    //   newX + newItem.horizontalSize * 30 * scale > roomDimensions.width * 30 * scale
    //     ? { x: 0, y: newY + newItem.verticalSize * 30 * scale + 10 }
    //     : { x: newX + 10, y: newY };

    // setNextPosition(newPosition);
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
        nextPosition={nextPosition}
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