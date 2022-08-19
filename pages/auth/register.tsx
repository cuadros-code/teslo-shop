import { useContext, useState } from 'react'
import { ErrorOutline } from '@mui/icons-material'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material'
import { AuthLayout } from 'components/layouts'
import { AuthContext } from 'context/auth/AuthContext'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { isEmail } from 'utils/validations'

type FormData = {
  name    : string
  email   : string
  password: string
}

const RegisterPage = () => {

  const router = useRouter()
  const [showErr, setShowErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { registerUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onRegisterUser: SubmitHandler<FormData> = async ({ name, email, password }) => {
    const { hasError, message } = await registerUser(name, email, password)

    if( hasError ) {
      setShowErr(true)
      setErrorMessage(message || '')
      setTimeout(() => setShowErr(false), 3000)
      return
    }

    router.replace('/')
  }

  return (
    <AuthLayout
      title='Crear cuenta'
    >
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <Typography variant='h1' component='h1' >Registrarse</Typography>
              <Chip 
                label={errorMessage}
                color='error'
                icon={<ErrorOutline />}
                sx={{ display: showErr ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Nombre completo' 
                variant='filled' 
                fullWidth 
                error={!!errors.name}
                helperText={errors.name?.message}
                {
                  ...register("name", {
                    required: 'El correo electrónico es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
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
                Registrarse
              </Button>
            </Grid>

            <Grid item xs={12}>
              <NextLink href='/auth/login' passHref>
                <Link underline='always' >
                  ¿Ya tienes una cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </Box>  
      </form>
    </AuthLayout>
  )
}

export default RegisterPage