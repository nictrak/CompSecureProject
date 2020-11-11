import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login/login'

const App = () => {
  return (<BrowserRouter >
    <Switch>
      <Route exact path={'/login'}>
        <Login />
      </Route>
      <Route exact path={'/register'}>
        <div>Register</div>
      </Route>
      <Route exact path={'/home'}>
        <Home />
      </Route>
    </Switch></BrowserRouter>)
}

export default App;
