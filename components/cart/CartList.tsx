import { FC, useContext, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { CardActionArea, CardMedia, Grid, Link, Box, Typography, Button } from '@mui/material';
import { ItemCounter } from 'components/ui';
import { CartContext } from 'context/cart/CartContext';
import { ICartProduct } from '../../interfaces/cart';

interface IProps {
  editable: boolean
}

export const CartList: FC<IProps> = ({ editable }) => {

  const [isRender, setIsRender] = useState(false)
  const { cart, updateCartQuantity, deleteCartProduct } = useContext(CartContext)

  useEffect(() => {
    setIsRender(true)
    return () => setIsRender(false)
  }, [])
  

  const onNewQuantityValue = ( product: ICartProduct, newQuantity: number ) => {
    product.quantity = newQuantity;
    updateCartQuantity(product)
  }
  
  return (
    <>
      {
        isRender && cart.map((product, index) => {
          return (
            <Grid container spacing={2} key={index} sx={{ mb:1 }}>
              <Grid item xs={3}>
                <NextLink href={`/product/${product.slug}`} passHref >
                  <Link>
                    <CardActionArea>
                      <CardMedia 
                        image={`/products/${product.images}`}
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
                  <Typography variant='body1' >Talla: <strong>{product?.size}</strong></Typography>

                  {
                    editable 
                      ? <ItemCounter
                          maxValue={ 5 }
                          currentValue={product.quantity}
                          updatedQuantity={ (value) => onNewQuantityValue(product, value) }
                        />
                      : <Typography variant='body1' >Cantidad: <strong>{product.quantity}</strong></Typography>
                  }
                </Box>
              </Grid>
              <Grid item xs={2} display='flex' alignItems='center' flexDirection='column' >
                <Typography variant='subtitle1' >${product.price}</Typography>
                {
                  editable &&
                  <Button 
                    variant='text' 
                    color='secondary'
                    onClick={() => deleteCartProduct(product)}
                  >
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