import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import PostTextBox from './components/Post/post.textbox';
import PostDisplay from './components/Post/post.display';
import AuthService from './api/auth.service';
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
          {user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path={'/home'}>
          <PostDisplay />
        </Route>
        <Route exact path={'/login'}>
          <Login />
        </Route>
        <Route exact path={'/register'}>
          <Register />
        </Route>
        <Route exact path={'/post'}>
          <PostTextBox />
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
