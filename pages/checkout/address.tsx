import { useContext } from 'react'
import Cookies from 'js-cookie'
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { countries } from 'utils/countries'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { CartContext } from 'context/cart/CartContext'

type FormData = {
  name    : string
  lastname: string
  address1: string
  address2?: string
  zipCode : string
  city    : string
  country : string
  phoneNumber: string
}

const getAddressFromCookies = () => {
  return {
    name        : Cookies.get('name')         || '',
    lastname    : Cookies.get('lastname')     || '',
    address1    : Cookies.get('address1')     || '',
    address2    : Cookies.get('address2')     || '',
    zipCode     : Cookies.get('zipCode')      || '',
    city        : Cookies.get('city')         || '',
    country     : Cookies.get('country')      || '',
    phoneNumber : Cookies.get('phoneNumber')  || '',
  }
}

const AddressPage = () => {


  const router = useRouter()
  const { updateAddress } = useContext(CartContext)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  })

  const onSubmit: SubmitHandler<FormData> = ( data ) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout
      title='Checkout - Address'
      pageDescription='Checkout - Address'
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>   
        <Typography variant='h1' component='h1'>Dirección</Typography>
        
        <Grid container spacing={2} sx={{ mt:2 }} >
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Nombre' 
              variant='filled' 
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {
                ...register("name", {
                  required: 'El nombre es requerido',
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Apellido' 
              variant='filled' 
              fullWidth
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              {
                ...register("lastname", {
                  required: 'El apellido es requerido',
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Dirección' 
              variant='filled' 
              fullWidth
              error={!!errors.address1}
              helperText={errors.address1?.message}
              {
                ...register("address1", {
                  required: 'La dirección es requerida',
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Dirección 2 (opcional)' 
              variant='filled' 
              fullWidth
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Código postal' 
              variant='filled' 
              fullWidth
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
              {
                ...register("zipCode", {
                  required: 'El código postal es requerido',
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Ciudad' 
              variant='filled' 
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
              {
                ...register("city", {
                  required: 'La ciudad es requerida',
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                label='País'
                defaultValue={Cookies.get('country') || "COL"}
                variant='filled'
                error={!!errors.country}
                helperText={errors.country?.message}
                {
                  ...register("country", {
                    required: 'El país es requerido',
                  })
                }
              >
                {
                  countries.map( (country, index) => (
                    <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label='Teléfono' 
              variant='filled' 
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {
                ...register("phoneNumber", {
                  required: 'El teléfono es requerido',
                })
              }
            />
          </Grid>
        </Grid>

        <Box sx={{ mt:5 }} display='flex' justifyContent='center' >
          <Button type='submit' color='secondary' className='circular-btn' size='large'>
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
//   const { token = '' } = ctx.req.cookies
//   let isValidJWT = false

//   try { 
//     await isValidToken(token)
//     isValidJWT = true
//   } catch (error) {
//     isValidJWT = false
//   }

//   if( !isValidJWT ) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent  : false
//       }
//     }
//   }

//   return {
//     props: {
      
//     }
//   }
// }

export default AddressPage