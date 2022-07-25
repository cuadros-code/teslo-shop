import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import { AuthLayout } from 'components/layouts'
import NextLink from 'next/link'

const LoginPage = () => {
  return (
    <AuthLayout
      title='Iniciar sesión'
    >
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Typography variant='h1' component='h1' >Iniciar sesión</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Correo electrónico' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Contraseña' type='password' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth >
              Iniciar sesión
            </Button>
          </Grid>

          <Grid item xs={12}>
            <NextLink href='/auth/register' passHref>
              <Link underline='always' >
                No tienes una cuenta?
              </Link>
            </NextLink>
          </Grid>

        </Grid>
      </Box>  
    </AuthLayout>
  )
}

export default LoginPage