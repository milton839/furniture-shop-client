import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Admin from './Component/Admin/Admin';
import Orders from './Component/Orders/Orders';
import Deals from './Component/Deals/Deals';
import NotFound from './Component/NotFound/NotFound';
import Login from './Component/Login/Login';
import { createContext, useState } from 'react';
import CheckOut from './Component/CheckOut/CheckOut';
import ManageProduct from './Component/ManageProduct/ManageProduct';
import EditProduct from './Component/EditProduct/EditProduct';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Shipment from './Component/Shipment/Shipment';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  return (
    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      <h2 className="text-center"> {loggedInUser.email}</h2>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
              <Home></Home>
          </Route>
          <PrivateRoute path="/checkOut/:pdId">
              <CheckOut></CheckOut>
          </PrivateRoute>
          <PrivateRoute path="/shipment/:pdId">
              <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute path="/orders">
              <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/admins">
              <Admin></Admin>
          </PrivateRoute>
          <Route path="/manageProduct">
              <ManageProduct></ManageProduct>
          </Route>
          <Route path="/editProduct">
              <EditProduct></EditProduct>
          </Route>
          <PrivateRoute path="/deals">
              <Deals></Deals>
          </PrivateRoute>
          <Route path="/login">
              <Login></Login>
          </Route>
          <Route exact path="/">
              <Home></Home>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
