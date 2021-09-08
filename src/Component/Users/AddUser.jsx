import React, { useState } from 'react';
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
import { addUser } from '../../Service/api';
import { useHistory } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: ''
};

const schema = Yup.object().shape({
  name: Yup.string().min(5, 'Deve ter no mínimo 5 caracteres').max(150, 'Deve ter no máximo 150 caracteres').required('Campo obrigatório'),
  email: Yup.string().email('Precisa ser um e-mail válido').required('Campo obrigatório'),
  phone: Yup.string().min(9, 'Deve ter no mínimo 9 dígitos').required('Campo obrigatório'),
  address: Yup.string().max(150, 'Deve ter no máximo 150 caracteres').required('Campo obrigatório'),
  gender: Yup.string().min(1, 'Selecione seu gênero').max(1, 'Selecione seu gênero').required('Campo obrigatório')
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

function AddUser() {
  const [hasErrors, setHasErrors] = useState(false);

  let history = useHistory();

  const classes = useStyles();

  const addUserAPI = async(user) => {
    await addUser(user).then((response) => {
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
            await addUserAPI(values);
          }}
          validationSchema={schema}
        >
          {({ submitForm, isSubmitting, handleSubmit, handleChange, handleBlur, values}) => (
            <Form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h4">Cadastro de Usuários</Typography>
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
                label="Email"
                name="email"
                value={values.email}
                type="email"
                variant="outlined"
              />
              <Field
                className={classes.field}
                component={TextField}
                label="Telefone"
                name="phone"
                value={values.phone}
                type="number"
                variant="outlined"
              />
              <Field
                className={classes.field}
                component={TextField}
                label="Endereço"
                name="address"
                value={values.address}
                type="text"
                variant="outlined"
              />
              <InputLabel className={classes.field}>Sexo</InputLabel>
              <Select
                value={values.gender}
                onChange={handleChange("gender")}
                variant="outlined"
              >
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='F'>F</MenuItem>
              </Select>
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

export default AddUser;
