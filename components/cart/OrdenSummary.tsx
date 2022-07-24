import { Grid, Typography } from '@mui/material';

export const OrdenSummary = () => {
  return (
    <Grid container>
      
      <Grid item xs={6}>
        <Typography >No. Productos:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography >3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography >SubTotal:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography > $150.5 </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography >Impuestos (15%):</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography > $9.38 </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='subtitle1' >Total:</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'> $159.83 </Typography>
      </Grid>

    </Grid>
  )
}

export default OrdenSummary