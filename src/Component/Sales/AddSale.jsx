import React, { useState, useEffect } from 'react';
import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { addSale, getProducts, getUsers } from '../../Service/api';
import { useHistory } from 'react-router-dom';

const initialValues = {
  productid: 0,
  userid: 0,
  quantity: 0
};

const schema = Yup.object().shape({
  quantity: Yup.number().min(1, 'Venda de no mínimo 1 produto').required('Campo obrigatório')
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '30rem',
  },
  field: {
    marginTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function AddSale() {
  const [hasErrors, setHasErrors] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  let history = useHistory();

  const classes = useStyles();

  const loadUsersDetails = async() => {
    await getUsers().then((response) => {
      setUsers(response.data);
    }).catch(() => {
      setHasErrors(true);
    })
  }

  const loadProductsDetails = async() => {
    await getProducts().then((response) => {
      setProducts(response.data);
    }).catch(() => {
      setHasErrors(true);
    })
  }

  useEffect(() => {
    loadUsersDetails();
    loadProductsDetails()
  }, [])

  const addSalePI = async(sale) => {
    await addSale(sale).then((response) => {
      history.push('./all')
    }).catch(() => {
      setHasErrors(true);
    }
  )}



  return (
    <div>
      {hasErrors && <Alert severity="error">Sentimos muito porém ocorreu um erro. Tente recarregar a página</Alert>}
      <div className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await addSalePI(values);
          }}
          validationSchema={schema}
        >
          {({ submitForm, isSubmitting, handleSubmit, handleChange, handleBlur, values}) => (
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h4">Cadastro de Vendas</Typography>
              <InputLabel className={classes.field}>Usuário</InputLabel>
              <Select
                value={values.userid}
                onChange={handleChange("userid")}
                variant="outlined"
              >
                {users.map((user) =>(
                  <MenuItem value={user.id}>{user.name} - Id:{user.id}</MenuItem>
                ))}
              </Select>
              <InputLabel className={classes.field}>Produto</InputLabel>
              <Select
                value={values.productid}
                onChange={handleChange("productid")}
                variant="outlined"
              >
                {products.map((product) =>(
                  <MenuItem value={product.id}>{product.name} - Id:{product.id}</MenuItem>
                ))}
              </Select>
              <Field
                className={classes.field}
                component={TextField}
                label="Quantidade"
                name="quantity"
                value={values.quantity}
                type="number"
                variant="outlined"
              />
              <Button
                className={classes.submitButton}
                color="primary"
                disabled={isSubmitting}
                disableElevation
                type="submit"
                variant="contained"
              >
                Cadastrar
              </Button>
              {isSubmitting && <LinearProgress color="secondary" />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddSale;
