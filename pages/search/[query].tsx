import type { GetServerSideProps } from 'next'
import { Typography} from '@mui/material'
import { ShopLayout } from 'components/layouts'
import { ProductList } from 'components/products'
import { getAllProducts, searchProduct } from 'database/dbProducts'
import { IProduct } from 'interfaces'

interface Props {
  products: IProduct[],
  query: string,
  existsProducts: boolean,
}

const SearchPage = ({ products, query, existsProducts }: Props) => {

  return (
    <ShopLayout title={'Teslo - Search'} pageDescription={''}>
      <Typography variant='h1' component='h1' >Buscar productos</Typography>
      {
        existsProducts 
          ? <Typography variant='h2' sx={{ mb: 1 }} >{query}</Typography>
          : <Typography variant='h2' sx={{ mb: 1 }} >No hay productos con ese nombre</Typography>
      }
      <ProductList products={products ?? []} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { query = '' } = params as { query: string };

  if (!query) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  let products = await searchProduct(query);
  const existsProducts = products.length > 0;

  if (!existsProducts) {
    products = await getAllProducts();
  }

  return {
    props: {
      products,
      query,
      existsProducts,
    }
  }
}

export default SearchPage
