import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import WebShop from "./pages/Webshop";
import Success from "./pages/Success";
import WorkoutPlans from "./pages/Workoutplans";
import Nutrition from "./pages/Nutrition";
import { useSelector } from "react-redux";
import React from 'react';
import { useEffect } from "react";
import { updateUserRequestToken } from "./requestMethods"; //


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


const App = () => {
  useEffect(() => {
    // Frissítjük a token-t alkalmazás elindulásakor
    updateUserRequestToken();
  }, []); // Az üres tömb biztosítja, hogy csak egyszer fusson le
  
  const user = useSelector(state=> state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        {user ? (
          <>
            <Route path="/products/:category">
              <ProductList />
            </Route>
            <Route path="/product/:id">
              <Product />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/webshop">
              <WebShop />
            </Route>
            <Route path="/edzestervek">
              <WorkoutPlans />
            </Route>
            <Route path="/taplalkozas">
              <Nutrition />
            </Route>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
};

export default App;