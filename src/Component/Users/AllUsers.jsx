import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { getUsers, deleteUser } from '../../Service/api';
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


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id).then((response) => {
      (response.data === true) ? getAllUsers() : setHasError(true);
    }).catch(() => {
      setHasError(true);
    })
  }

  const getAllUsers = async () => {
    await getUsers().then((response) => {
      setUsers(response.data);
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
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow className={classes.row} key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/users/edit/${user.id}`}>Editar</Button>
                <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Deletar</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllUsers;