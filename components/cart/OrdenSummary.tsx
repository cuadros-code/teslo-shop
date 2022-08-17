import { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { CartContext } from 'context/cart/CartContext';
import { format } from 'utils/currency';

export const OrdenSummary = () => {

  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)

  return (
    <Grid container>
      
      <Grid item xs={6}>
        <Typography >No. Productos:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography >{numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography >SubTotal:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography >{ format(subTotal) }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography >Impuestos (15%):</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography > { format(tax) } </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='subtitle1' >Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'> { format(total) } </Typography>
      </Grid>

    </Grid>
  )
}

export default OrdenSummary