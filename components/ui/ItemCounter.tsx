import { FC, useState } from "react"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from '@mui/material';

interface IProps {
  currentValue: number
  maxValue: number
  updatedQuantity: (quantity: number) => void
}

export const ItemCounter: FC<IProps> = ({ currentValue, maxValue, updatedQuantity }) => {

  const subtractQuantity = () => {
    if( currentValue <= 1) return
    updatedQuantity(currentValue - 1)
  }

  const addQuantity = () => {
    if( currentValue >= maxValue ) return
    updatedQuantity(currentValue + 1)
  }

  return (
    <Box display='flex' alignItems='center' >
      <IconButton onClick={subtractQuantity}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} >{currentValue}</Typography>
      <IconButton onClick={addQuantity}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
export default ItemCounter