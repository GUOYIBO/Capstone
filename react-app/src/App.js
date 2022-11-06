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

  console.log('test ------')
  if (!loaded) {
    console.log('not loaded, return null')
    return null;
  }
  

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Header/>
      <Switch>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact>
          <SignUpForm />
        </Route>
        <Route path='/' exact>
          <Splash />
        </Route>

      {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> 
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>  */}

        <Route path='/main' exact>
          <Main />
        </Route>

        <ProtectedRoute path='/mycategories' exact>
          <MyCategory />
        </ProtectedRoute>
        
        <ProtectedRoute path='/myitems' exact>
          <MyItems />
        </ProtectedRoute>

        <ProtectedRoute path='/myfavoritedishes' exact >
          <MyFavoriteDish />
        </ProtectedRoute>

        <ProtectedRoute path='/mypurchaselists' exact>
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
