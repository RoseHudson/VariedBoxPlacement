import { Box, Typography } from '@mui/material';

export default function Room ({roomDimensions, scale, curItemList}){
    return (
        <Box
          sx={{
            width: roomDimensions.width * scale,  // Multiplied for scaling
            height: roomDimensions.length * scale, // Multiplied for scaling
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
                top: `${item.verticalPos * scale}px`,
                left: `${item.horizontalPos * scale}px`,
                width: item.horizontalSize * scale, // Scaled width
                height: item.verticalSize * scale,   // Scaled height
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