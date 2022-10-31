import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Main from './components/Main'
import Splash from './components/Splash'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  console.log('test ------')
  if (!loaded) {
    console.log('not loaded, return null')
    return null;
  }
  

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <Splash />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <ProtectedRoute path='/main' exact={true} >
          <Main />
        </ProtectedRoute>

        <ProtectedRoute path='/mycategory' exact={true} >
          <h1>My Page</h1>
        </ProtectedRoute>


        <ProtectedRoute path='/items/add' exact={true} >
          <h1> add items</h1>
        </ProtectedRoute>

        <ProtectedRoute path='/items/add' exact={true} >
          <h1> add items</h1>
        </ProtectedRoute>

        <ProtectedRoute path='/mypurchaselist/' exact={true} >
          <h1> my list</h1>
        </ProtectedRoute>

        <ProtectedRoute path='/myfavoritedish/' exact={true} >
          <h1> my list  (today's recommandation)</h1>
        </ProtectedRoute>



      </Switch>
    </BrowserRouter>
  );
}

export default App;
