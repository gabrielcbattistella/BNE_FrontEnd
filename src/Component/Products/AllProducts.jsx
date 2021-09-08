import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { getProducts, deleteProduct } from '../../Service/api';
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


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProductData = async (id) => {
    await deleteProduct(id).then((response) => {
      (response.data === true) ? getAllProducts() : setHasError(true);
    }).catch(() => {
      setHasError(true);
    })
  }

  const getAllProducts = async () => {
    await getProducts().then((response) => {
      setProducts(response.data);
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
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Estoque</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow className={classes.row} key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/products/edit/${product.id}`}>Editar</Button>
                <Button color="secondary" variant="contained" onClick={() => deleteProductData(product.id)}>Deletar</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllProducts;