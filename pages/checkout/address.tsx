import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => {
  return (
    <ShopLayout
      title='Checkout - Address'
      pageDescription='Checkout - Address'
    >
      <Typography variant='h1' component='h1'>Dirección</Typography>
      
      <Grid container spacing={2} sx={{ mt:2 }} >
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección 2 (opcional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Código postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant='filled' fullWidth>
            <InputLabel>País</InputLabel>
            <Select
              variant='filled'
              label='País'
              value={1}
            >
              <MenuItem value={1}>Argentina</MenuItem>
              <MenuItem value={2}>Colombia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt:5 }} display='flex' justifyContent='center' >
        <Button color='secondary' className='circular-btn' size='large'>
          Revisar pedido
        </Button>
      </Box>

    </ShopLayout>
  )
}

export default AddressPage