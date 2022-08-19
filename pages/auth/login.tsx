import { useContext, useState } from 'react';
import NextLink from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import { AuthLayout } from 'components/layouts'
import { isEmail } from '../../utils/validations';
import { tesloApi } from 'api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from 'context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {

  const router = useRouter();
  const [showErr, setShowErr] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser: SubmitHandler<FormData> = async ({ email, password }) => {
    const isLogin = await loginUser(email, password);
    setShowErr(isLogin === false);
    setTimeout(() => setShowErr(false), 3000);

    if(isLogin) router.replace('/');
  }

  return (
    <AuthLayout
      title='Iniciar sesión'
    >
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' >Iniciar sesión</Typography>
              <Chip 
                label='Credeciales incorrectas'
                color='error'
                icon={<ErrorOutline />}
                sx={{ display: showErr ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo electrónico' 
                variant='filled' 
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {
                  ...register("email", {
                    required: 'El correo electrónico es requerido',
                    validate: isEmail
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Contraseña' 
                type='password' 
                variant='filled' 
                fullWidth 
                error={!!errors.password}
                helperText={errors.password?.message}
                {
                  ...register("password", {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button color='secondary' className='circular-btn' size='large' fullWidth type='submit' >
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
      </form>
    </AuthLayout>
  )
}

export default LoginPage