import { Box, Typography } from '@mui/material';

export default function Room ({roomDimensions, scale, curItemList, nextPosition}){
    return (
        <Box
          sx={{
            width: roomDimensions.width * 30 * scale,  // Multiplied for scaling
            height: roomDimensions.length * 30 * scale, // Multiplied for scaling
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
            Room ({roomDimensions.width} x {roomDimensions.length})
          </Typography>

        {/* Render Items in the Room */}
        {curItemList.map((item) => (
            <Box
            key={item.id}
            sx={{
                position: 'absolute',
                top: `${nextPosition.x}px`,
                left: `${nextPosition.y}px`,
                width: item.horizontalSize * 30 * scale, // Scaled width
                height: item.verticalSize * 30 * scale,   // Scaled height
                border: '2px solid #000',
                backgroundColor: '#ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}
            >
            <Typography>{item.name}</Typography>
            </Box>
        ))}
    </Box>
    )
}