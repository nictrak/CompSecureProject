import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from './authContext'
import Home from './components/home';
import Login from './components/Login/login'
import Authentication from './components/authentication'

const App = () => {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path={'/'}>
          <Authentication />
        </Route>
        <Route render={() => <Redirect to="/" />} />
        {/* <Route exact path={'/register'}>
          <div>Register</div>
        </Route>
        <Route exact path={'/home'}>
          <Home />
        </Route> */}
      </Switch>
    </BrowserRouter>

  );
}

export default App;
