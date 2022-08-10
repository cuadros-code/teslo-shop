import type { NextPage } from 'next'
import { Typography} from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { ProductList } from 'components/products'
import { useProducts } from 'hooks'
import { Loading } from 'components/ui'

const KidPage: NextPage = () => {

  const { products, error, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout title={'Teslo - Women'} pageDescription={'women page'}>
      <Typography variant='h1' component='h1' >Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }} >Todos los productos</Typography>
      {
        isLoading 
          ? <Loading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KidPage
