import React from 'react';
import { makeStyles, Button, Menu, MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const UsersButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const useStyle = makeStyles({
    header: {
      background: '#22223b'
    },
    tabs: {
      color: '#22223b',
      textDecoration: 'none',
    }
  })

  const classes = useStyle();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Usuários
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><NavLink className={classes.tabs} to="/users/all" exact>Listar</NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink className={classes.tabs} to="/users/add" exact>Criar</NavLink></MenuItem>
      </Menu>
    </div>
  );
}

export default UsersButton;