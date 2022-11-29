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
import MyItems from './components/MyItem';
import MyPurchaseList from './components/MyPurchaseList';
import MyCategory from './components/MyCategory';
import MyFavoriteDish from './components/MyFavoriteDish';
import AddItems from './components/AddItems'
import MyItemTypes from './components/MyItemTypes';
import Header from './components/Header';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  
  if (!loaded) {
    console.log('not loaded, return null')
    return null;
  }
  

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      
      <Switch>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact>
          <SignUpForm />
        </Route>
        <Route path='/' exact>
          <Header/>
          <Splash />
        </Route>

      {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> 
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>  */}

        <Route path='/main' exact>
        <Header/>
          <Main />
        </Route>

        <ProtectedRoute path='/mycategories' exact>
        <Header/>
          <MyCategory />
        </ProtectedRoute>
        
        <ProtectedRoute path='/myitemtypes' exact>
        <Header/>
          <MyItemTypes />
        </ProtectedRoute>

        <ProtectedRoute path='/myitems' exact>
        <Header/>
          <MyItems />
        </ProtectedRoute>

        <ProtectedRoute path='/myfavoritedishes' exact >
        <Header/>
          <MyFavoriteDish />
        </ProtectedRoute>

        <ProtectedRoute path='/mypurchaselists' exact>
        <Header/>
           <MyPurchaseList />
        </ProtectedRoute>

        
        {/* <ProtectedRoute path='/additems' exact >
           <AddItems />
        </ProtectedRoute> */}
        

      </Switch>
    </BrowserRouter>
  );
}

export default App;
