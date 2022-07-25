import { ShopLayout } from "components/layouts"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CartList, OrdenSummary } from "components/cart"
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"

const OrderPage = () => {
  return (
    <ShopLayout
      title='Resumen de la orden - Checkout'
      pageDescription='Resumen de la orden - Checkout'
    >
      <Typography variant='h1' component='h1'>Orden: A123124</Typography>

      {/* <Chip 
        label='Pendiente de pago'
        sx={{ my: 2 }}
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip 
        label='Pagada'
        sx={{ my: 2 }}
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid> 
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2' component='h3'>Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} /> 
              
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline="always">
                    Editar
                  </Link>
                </NextLink>
              </Box>
              
              <Typography >Kevin Cuadros</Typography>
              <Typography >Calle 10 2#23</Typography>
              <Typography >El molino</Typography>
              <Typography >763912</Typography>
              <Typography >Colombia</Typography>
              <Typography >+57 3178237572</Typography>

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
                <h1>Pagar</h1>
                <Chip
                  label='Pagada'
                  sx={{ my: 2 }}
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
                {/* <Button color='secondary' fullWidth className='circular-btn' >
                  Confirmar pedido
                </Button> */}
              </Box>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage