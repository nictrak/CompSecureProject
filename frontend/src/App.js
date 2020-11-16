import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import PostTextBox from './components/Post/post.textbox';
import PostDisplay from './components/Post/post.display';
import CommentDisplay from './components/Post/comment.display';
import Header from './components/header';
import AuthService from './api/auth.service';
// import Authentication from './components/authentication'

const App = () => {

  // const [user, setUser] = useState(undefined)

  // useEffect(() => {
  //   setUser(AuthService.getCurrentUser())
  // }, [])

  return (
    <BrowserRouter >
      <Header />
      <Switch>
        <Route exact path={'/'}>
          {localStorage.getItem('user') ? <Home /> : <Redirect to="/login" />}
        </Route>
        {/* <Route exact path={'/home'}>
          <PostDisplay />
        </Route> */}
        <Route exact path={'/login'}>
          {!localStorage.getItem('user') ? <Login /> : <Redirect to="/" />}
          {/* <Login /> */}
        </Route>
        <Route exact path={'/register'}>
          {!localStorage.getItem('user') ? <Register /> : <Redirect to="/" />}
          {/* <Register /> */}
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
