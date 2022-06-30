import { Box, Typography } from '@mui/material';
import { ShopLayout } from 'components/layouts';

export const Page404 = () => {
  return (
    <ShopLayout 
      title="404"
      pageDescription="Página no encontrada"
    >
      <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">
        <Typography variant='h1' component='h1' fontSize={50} fontWeight={200} >
          404 |
        </Typography>
        <Typography marginLeft={2} >
          Página no encontrada
        </Typography>
      </Box>
    </ShopLayout>
  )
}
export default Page404