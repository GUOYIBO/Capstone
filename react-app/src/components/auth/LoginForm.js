import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect ,Link} from 'react-router-dom';
import { login } from '../../store/session';
import { getAllFavoriteDishesThunk} from '../../store/favoriteDish'
import { getAllCategoryThunk} from '../../store/category'
import { getAllPurchaseListsThunk} from '../../store/purchaseList'
import { getAllItemsThunk } from '../../store/item'
import './LoginForm.css'
import '../../index.css'
import spalsh1 from '../../image/splash1.jpg';
import { onErrorLoadHandler } from '../../utils/helper';

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
      const formatedErrors=data.map(err=> {
        // const [_field, message]= err.split(":")
        // return message.slice(1)
        const errMsgArr = err.split(":");
        return  errMsgArr.length >1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors);
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
    <div>
      <div className="logout-navContainer">
            <div id="logotitle">
          <div className="logotitle1">My</div>
          <div className="logotitle2">Pantry</div></div> 
        </div> 
        <div className='splash-main-container'>
        
        
    <div className='login-container'>
    <div className='login-box'>
    <form onSubmit={onLogin}>
    <div className="form-content-container">
      <div className='form-title'>Login</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind} className="error-msg">{error}</div>
        ))}
      </div>
      <div className='login-input'>
        <div className='form-subtitle'>
        <span htmlFor='email' >Email</span></div>
        <div className='form-input'>
        <input
          name='email'
          type='text'
          placeholder='Email'
          className='login-input-field'
          value={email}
          onChange={updateEmail}
          required
        />
        </div>
      </div>
      <div className='login-input'>
        <div className='form-subtitle'>
        <span htmlFor='password' className='form-subtitle'>Password</span>
        </div>
        <div className='form-input'>
        <input
          name='password'
          type='password'
          placeholder='Password'
          className='login-input-field'
          value={password}
          onChange={updatePassword}
          required
        />
         </div>
    </div>
        <div className="form-button">
           <button type='submit'>Login</button>
        </div>
        <div className="form-button">
           <button type='submit' id="demo-user" onClick={demoUserLogin}>Login As Demo User</button>
        </div>
        <div id="signup-link">
            <Link to={"/sign-up"} id="linktosignup">
              <button>Create an acount</button></Link>
        </div>
      </div>
    </form>
    </div>
    </div>
    <div className="splash-background">
                <img onError={onErrorLoadHandler} src={spalsh1} />
            </div>
    </div>
    </div>
  );
};

export default LoginForm;
