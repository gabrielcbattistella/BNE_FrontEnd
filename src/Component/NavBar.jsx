import React from 'react';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import UsersButton from './Buttons/UsersButton';
import ProductsButton from './Buttons/ProductsButton';
import SalesButton from './Buttons/SalesButton';
import HomeButton from './Buttons/HomeButton';

const useStyle = makeStyles({
  header: {
    background: '#22223b'
  },
  tabs: {
    color: '#f2e9e4',
    marginRight: 20,
    textDecoration: 'none',
    fontSize: 20
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  }
})

const NavBar = () => {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.container}>
        <HomeButton />
        <UsersButton />
        <ProductsButton />
        <SalesButton />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;