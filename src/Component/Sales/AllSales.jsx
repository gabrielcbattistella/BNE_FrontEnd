import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { getSales, deleteSale } from '../../Service/api';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#22223b',
            color: '#f2e9e4'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllSales = () => {
  const [sales, setSales] = useState([]);
  const [hasError, setHasError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getAllSales();
  }, []);

  const deleteSaleData = async (id) => {
    await deleteSale(id).then((response) => {
      (response.data === true) ? getAllSales() : setHasError(true);
    }).catch(() => {
      setHasError(true);
    })
  }

  const getAllSales = async () => {
    await getSales().then((response) => {
      setSales(response.data);
      console.log(response.data);
    }).catch(() => {
      setHasError(true);
    })
  }

  return (
    <div>
      {hasError && <Alert severity="error">Sentimos muito porém ocorreu um erro. Tente recarregar a página</Alert>}
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>Id do produto</TableCell>
            <TableCell>Id do usuário</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow className={classes.row} key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{sale.productId}</TableCell>
              <TableCell>{sale.userId}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{sale.total}</TableCell>
              <TableCell>
                <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/sales/edit/${sale.id}`}>Editar</Button>
                <Button color="secondary" variant="contained" onClick={() => deleteSaleData(sale.id)}>Deletar</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllSales;