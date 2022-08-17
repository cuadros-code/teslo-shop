import { useContext, useState } from 'react';
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import ShopLayout from 'components/layouts/ShopLayout';
import { ProductSlide, SizeSelector } from 'components/products';
import { ItemCounter } from 'components/ui';
import { IProduct } from '../../interfaces/products';
import { getAllProductSlug } from 'database/dbProducts';
import { getProductBySlug } from 'database/dbProducts';
import { ICartProduct } from 'interfaces/cart';
import { useRouter } from 'next/router';
import { CartContext } from 'context/cart/CartContext';

interface Props {
  product: IProduct;
}

export const ProductPage = ({ product }: Props) => {

  const router = useRouter();
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 0,
  })

  const updateQuantity = ( quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity
    })
  }

  const onAddToCart = () => {
    if( !tempCartProduct.size ) return;
    addProductToCart(tempCartProduct);
    router.push('/cart')
  }

  return (
    <ShopLayout
      title={product.title}
      pageDescription={product.description}
    >
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={7}>
          <ProductSlide images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box sx={{ mt:1 }} className='fadeIn' display='flex' flexDirection='column' >
            <Typography variant='h1' component='h1' fontWeight={700}>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2' >${product.price}</Typography>
            
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' >Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={updateQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector 
                sizes={product.sizes} 
                selectedSize={tempCartProduct.size}
                onSelectSize={(size) => {
                  setTempCartProduct({
                    ...tempCartProduct,
                    size,
                  })
                }}
              />
            </Box>

            {
              product.inStock > 0 
              ? <Button 
                  color='secondary' 
                  className='circular-btn'  
                  disabled={ tempCartProduct?.size === undefined || tempCartProduct.quantity === 0 }
                  onClick={onAddToCart}
                >
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Selecciona una talla'
                  }
                </Button>
              : <Chip label='No hay disponibles' color='error' variant='outlined'/>
            }

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' >Descripción</Typography>
              <Typography variant='body2' >{product.description}</Typography>
            </Box>

          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
//   const { slug } = ctx.query;

//   const product = await getProductBySlog(`${slug}`);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const slugs = await getAllProductSlug();
  
  return {
    paths: slugs.map(slug => ({ 
      params: { 
        slug: slug.slug
      } 
    })),
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const { slug } = ctx.params as { slug: string };

  const product = await getProductBySlug(`${slug}`);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage