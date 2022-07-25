import { FC } from 'react'
import { CardActionArea, CardMedia, Grid, Link, Box, Typography, Button } from '@mui/material';
import { initialData } from '../../database/products';
import NextLink from 'next/link'
import { ItemCounter } from 'components/ui';

interface IProps {
  editable: boolean
}

const productInCard = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export const CartList: FC<IProps> = ({ editable }) => {

  return (
    <>
      {
        productInCard.map((product, index) => {
          return (
            <Grid container spacing={2} key={product.slug} sx={{ mb:1 }}>
              <Grid item xs={3}>
                <NextLink href={`/product/slug`} passHref >
                  <Link>
                    <CardActionArea>
                      <CardMedia 
                        image={`/products/${product.images[0]}`}
                        component="img"
                        sx={{ borderRadius: '5px' }}
                      />
                    </CardActionArea>
                  </Link>
                </NextLink>
              </Grid>
              <Grid item xs={7}>
                <Box display='flex' flexDirection='column' >
                  <Typography variant='body1' >{product.title}</Typography>
                  <Typography variant='body1' >Talla: <strong>M</strong></Typography>

                  {
                    editable 
                      ? <ItemCounter />
                      : <Typography variant='body1' >Cantidad: <strong>1</strong></Typography>
                  }
                </Box>
              </Grid>
              <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                <Typography variant='subtitle1' >${product.price}</Typography>
                {
                  editable &&
                  <Button variant='text' color='secondary'>
                    Eliminar
                  </Button>
                }
              </Grid>
            </Grid>
          )
        })
      }
    </>
  )
}
export default CartList