import AllUsers from './Component/Users/AllUsers';
import AllProducts from './Component/Products/AllProducts';
import AllSales from './Component/Sales/AllSales';
import AddUser from './Component/Users/AddUser';
import AddProduct from './Component/Products/AddProduct'
import AddSale from './Component/Sales/AddSale';
import EditUser from './Component/Users/EditUser';
import EditProduct from './Component/Products/EditProduct';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import Home from './Component/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Assets/Css/font.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/all" component={AllUsers} />
        <Route exact path="/users/add" component={AddUser} />
        <Route exact path="/users/edit/:id" component={EditUser} />
        <Route exact path="/products/all" component={AllProducts} />
        <Route exact path="/products/add" component={AddProduct} />
        <Route exact path="/products/edit/:id" component={EditProduct} />
        <Route exact path="/sales/all" component={AllSales} />
        <Route exact path="/sales/add" component={AddSale} />
        <Route exact path="/sales/edit/:id" component={EditProduct} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
