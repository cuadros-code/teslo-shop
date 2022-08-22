import { useContext, useEffect } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { CartList, OrdenSummary } from 'components/cart'
import ShopLayout from '../../components/layouts/ShopLayout'
import { CartContext } from 'context/cart/CartContext'
import { useRouter } from 'next/router'

export const CartPage = () => {

  const router = useRouter()
  const { cart } = useContext(CartContext)

  useEffect(() => {
    if(cart.length === 0){
      router.replace('/cart/empty')
    }
  }, [cart.length, router])

  return (
    <ShopLayout
      title='Carrito'
      pageDescription='Carrito de compras'
    >
      <Typography variant='h1' component='h1'>Carrito</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid> 
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h3'>Orden</Typography>
              <Divider sx={{ my: 1 }} /> 
              <OrdenSummary />
              
              <Box sx={{ mt: 3 }}>
                <Button 
                  color='secondary' 
                  fullWidth 
                  className='circular-btn' 
                  href='/checkout/address'
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}
export default CartPage