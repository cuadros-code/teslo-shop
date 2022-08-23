import { ShopLayout } from "components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { CartList, OrdenSummary } from "components/cart"
import NextLink from 'next/link'
import { useContext } from "react"
import { CartContext } from "context/cart/CartContext"

const SummaryCheckout = () => {

  const { shippingAddress, numberOfItems } = useContext(CartContext)

  return (
    <ShopLayout
      title='Revisar pedido - Checkout'
      pageDescription='Revisar pedido - Checkout'
    >
      <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid> 
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h3'>Resumen ({numberOfItems}  {numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
              <Divider sx={{ my: 1 }} /> 
              
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              
              <Typography > {shippingAddress?.name} {shippingAddress?.lastname}</Typography>
              <Typography > {shippingAddress?.address1}</Typography>
              <Typography > {shippingAddress?.city} {shippingAddress?.zipCode}</Typography>
              <Typography > {shippingAddress?.country}</Typography>
              <Typography > {shippingAddress?.phoneNumber}</Typography>

              <Divider sx={{ my: 1 }} /> 

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrdenSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' fullWidth className='circular-btn' >
                  Confirmar pedido
                </Button>
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryCheckout