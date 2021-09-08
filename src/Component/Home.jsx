import { Box, Typography, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import React, {useState, useEffect} from 'react';
import { getUsers, getProducts, getSales } from '../Service/api';

const useStyles = makeStyles({
  component: {
    margin: 50,
    '& > *': {
      marginTop: 50
    }
  },
  image: {
    width: '50%',
    height: '50%'
  }
})

const Home = () => {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [sales, setSales] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getAllUsersCount();
    getAllProductsCount();
    getAllSalesCount();
  }, []);

const getAllUsersCount = async () => {
  await getUsers().then((response) => {
    setUsers(response.data.length);
  }).catch(() => {
    setHasError(true);
  })
}

const getAllProductsCount = async () => {
  await getProducts().then((response) => {
    setProducts(response.data.length);
  }).catch((err) => {
    setHasError(true);
  })
}

const getAllSalesCount = async () => {
  await getSales().then((response) => {
    setSales(response.data.length);
  }).catch((err) => {
    setHasError(true);
  })
}

    const classes = useStyles();
    return (
    <div>
      {hasError && <Alert severity="error">Sentimos muito porém ocorreu um erro. Tente recarregar a página</Alert>}
      
      {!hasError && 
        <Box className={classes.component}>
          <Typography variant="h4">{users} Usuário(s)</Typography>
          <Typography variant="h4">{products} Produto(s)</Typography>
          <Typography variant="h4">{sales} Vendas</Typography>
        </Box>
      }
    </div>
  )
}

export default Home;