import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import NextLink from 'next/link'
import { Box, Link, Typography } from '@mui/material'
import { ShopLayout } from "components/layouts"

export const EmptyPage = () => {
  return (
    <>
      <ShopLayout 
        title="Carro vacio"
        pageDescription="Carro vacio"
      >
        <Box 
          display='flex' 
          justifyContent='center' 
          alignItems='center' 
          height="calc(100vh - 200px)"
        >
          <RemoveShoppingCartOutlined  sx={{ fontSize: 60 }} />
          <Box display='flex' flexDirection='column' alignItems='center' >
            <Typography ml={1} fontSize={20} >
              Su carro está vacio
            </Typography>
            <NextLink href="/" passHref>
              <Link typography='h5' color='secondary'>
                Regresar
              </Link>
            </NextLink>
          </Box>
        </Box>
      </ShopLayout>
    </>
  )
}
export default EmptyPage