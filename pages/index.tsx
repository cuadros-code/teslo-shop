import { Typography, Grid, Card, CardActionArea, CardMedia } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { initialData } from '../database/products'

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo - Home'} pageDescription={''}>
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>

      <Grid container spacing={4}>
        {initialData.products.map((product, index) => (
          <Grid item xs={6} sm={4} key={index}>
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
        ))}
      </Grid>

    </ShopLayout>
  )
}

export default Home
