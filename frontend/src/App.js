import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from './authContext'
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import AuthService from './api/auth.service'
// import Authentication from './components/authentication'

const App = () => {

  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [])

  return (
    <BrowserRouter >
      <Switch>
        <Route exact path={'/'}>
          {/* {user ? <Home /> : <Redirect to="/login" />} */}
          <Home/>
        </Route>
        <Route exact path={'/login'}>
          <Login />
        </Route>
        <Route exact path={'/register'}>
          <Register />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
