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
import { editProduct, getProducts } from '../../Service/api';
import { useHistory, useParams } from 'react-router-dom';

const initialValues = {
  id: '',
  name: '',
  price: '',
  stock: 0
}

const schema = Yup.object().shape({
  name: Yup.string().min(5, 'Deve ter no mínimo 5 caracteres').max(150, 'Deve ter no máximo 150 caracteres').required('Campo obrigatório'),
  price: Yup.string().required('Campo obrigatório'),
  stock: Yup.number().min(1, 'Deve ter no mínimo 1 unidade').required('Campo obrigatório'),
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

const EditProduct = () => {
  const [product, setProduct] = useState(initialValues);
  const [hasErrors, setHasErrors] = useState(false);
  const { id } = useParams();
  const classes = useStyles();
  let history = useHistory();

  const loadProductDetails = async() => {
    await getProducts(id).then((response) => {
      setProduct(response.data);
    }).catch(() => {
      setHasErrors(true);
    })
  }

  useEffect(() => {
    loadProductDetails();
  }, []);

  const editProductAPI = async(product) => {
    await editProduct(id, product).then(() => {
      history.push('/products/all');
    }).catch(() => {
      setHasErrors(true);
    })
  }

  return (
    <div>
      {hasErrors && <Alert severity="error">Sentimos muito porém ocorreu um erro. Tente recarregar a página</Alert>}
      <div className={classes.root}>
        <Formik
          enableReinitialize={true}
          initialValues={product}
          onSubmit={async (values) => {
            await editProductAPI(values);
          }}
          validationSchema={schema}
        >
          {({ isSubmitting, handleSubmit, handleChange, values}) => (
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h4">Edição de Produtos</Typography>
              <Field
                className={classes.field}
                component={TextField}
                label="Nome"
                name="name"
                value={values.name}
                type="text"
                variant="outlined"
              />
              <Field
                className={classes.field}
                component={TextField}
                label="Preço"
                name="price"
                value={values.price}
                type="text"
                variant="outlined"
              />
              <Field
                className={classes.field}
                component={TextField}
                label="Estoque"
                name="stock"
                value={values.stock}
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
                Editar
              </Button>
              {isSubmitting && <LinearProgress color="secondary" />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default EditProduct;