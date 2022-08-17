import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CartList, OrdenSummary } from 'components/cart';
import ShopLayout from '../../components/layouts/ShopLayout';

export const CartPage = () => {
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
                <Button color='secondary' fullWidth className='circular-btn' >
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