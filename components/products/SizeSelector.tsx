import { Box, Button } from "@mui/material"
import { ISizes } from "interfaces"
import { FC } from "react"

interface IProps {
  sizes: ISizes[]
  selectedSize?: ISizes
}

export const SizeSelector: FC<IProps> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {
        sizes.map( name => (
          <Button 
            key={name}
            size='small'
            color={selectedSize === name ? 'primary' : 'info'}
          >
            { name }
          </Button>
        ))
      }
    </Box>
  )
}
export default SizeSelector