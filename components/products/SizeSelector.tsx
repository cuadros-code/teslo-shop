import { FC } from "react"
import { Box, Button } from "@mui/material"
import { ISizes } from "interfaces"

interface IProps {
  sizes         : ISizes[]
  selectedSize? : ISizes
  onSelectSize  : (size: ISizes) => void;
}

export const SizeSelector: FC<IProps> = ({ selectedSize, sizes, onSelectSize }) => {
  return (
    <Box>
      {
        sizes.map( name => (
          <Button 
            key={name}
            size='small'
            color={selectedSize === name ? 'primary' : 'info'}
            onClick={() => onSelectSize(name)}
          >
            { name }
          </Button>
        ))
      }
    </Box>
  )
}
export default SizeSelector