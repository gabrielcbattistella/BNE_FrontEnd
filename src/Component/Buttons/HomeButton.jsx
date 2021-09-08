import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const HomeButton = () => {

  const useStyle = makeStyles({
    header: {
      background: '#22223b'
    },
    tabs: {
      color: '#22223b',
      textDecoration: 'none',
    },
    Button: {
      color: '#f2e9e4',
      backgroundColor: '#4a4e69'
    },
  })

  const classes = useStyle();

  return (
    <div>
      <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true">
        <NavLink className={classes.tabs} to="/" exact>Página Inicial</NavLink>
      </Button>

    </div>
  );
}

export default HomeButton;