import { FC } from "react"
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from '@mui/material';

interface IProps {

}

export const ItemCounter: FC<IProps> = () => {
  return (
    <Box display='flex' alignItems='center' >
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} >1</Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
export default ItemCounter