import { Card, CardActionArea, CardMedia, Grid } from "@mui/material"
import { FC } from "react"
import { IProduct } from '../../interfaces/products';

interface IProps {
  product: IProduct
}

export const ProductCard: FC<IProps> = ({ product }) => {
  return (
    <>
      <Grid item xs={6} sm={4}>
        <Card>
          <CardActionArea>
            <CardMedia 
              component='img'
              image={`products/${product.images[0]}`}
              alt={product.title}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </>
  )
}
export default ProductCard 