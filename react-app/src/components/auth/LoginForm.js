import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect ,Link} from 'react-router-dom';
import { login } from '../../store/session';
import { getAllFavoriteDishesThunk} from '../../store/favoriteDish'
import { getAllCategoryThunk} from '../../store/category'
import { getAllPurchaseListsThunk} from '../../store/purchaseList'
import { getAllItemsThunk } from '../../store/item'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUserLogin = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'))
  }

  console.log('--------- login')
  if (user) {
  
    return <Redirect to='/main' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button type='submit' id="demo-user" onClick={demoUserLogin}>Log In As Demo User</button>
        <div id="signup-link">
            <Link to={"/sign-up"} id="linktosignup">Creat an acount</Link>
         </div>
      </div>
    </form>
  );
};

export default LoginForm;
