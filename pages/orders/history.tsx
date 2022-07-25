import { Chip, Grid, Link, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { ShopLayout } from "components/layouts"
import NextLink from 'next/link'

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "fullname",
    headerName: "Nombre completo",
    width: 300,
    sortable: false,
  },
  {
    field: "paid",
    headerName: "Pagado",
    width: 200,
    renderCell: (row: GridValueGetterParams) => {
      return (
        row.row.paid 
        ? <Chip color='success' label='Pagada' variant="outlined" />
        : <Chip color='error' label='No pagada' variant="outlined" />
      )
    }
  },
  {
    field: "link",
    headerName: "Ver pedido",
    width: 200,
    renderCell: (row: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${row.row.id}`}>
          <Link sx={{ cursor: 'pointer' }} underline="always" >Ver Orden</Link>
        </NextLink>
      )
    }
  }
]


const rows = [
  { id: 1, paid: false, fullname: "Kevin David Cuadros",},
  { id: 2, paid: true, fullname: "Juan David Cuadros", },
  { id: 3, paid: false, fullname: "Luis David Cuadros", },
  { id: 4, paid: false, fullname: "Juan David Cuadros", },
]

const HistoryPage = () => {
  return (
    <ShopLayout
      title='Historial de pedidos' 
      pageDescription='Historial de pedidos'
    >
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            columns={columns} 
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage