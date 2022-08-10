import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export const Loading = () => {
  return (
    <Box 
      display='flex' 
      justifyContent='center' 
      alignItems='center' 
      height="calc(100vh - 200px)" 
      flexDirection='column'
    >
      <Typography>
        Cargando...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  )
}

export default Loading