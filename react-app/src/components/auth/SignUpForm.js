import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useEffect } from 'react';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    if (!hasSubmitted) setHasSubmitted(true);

    e.preventDefault();
    let validationErrors=[]

    if (email.trim().length === 0) {
      validationErrors.push('Please enter email')
    }

    if(!email.includes('@')){
      validationErrors.push("Please enter correct email.")
    }

    if (username.trim().length === 0) {
      validationErrors.push('Please enter username.')
    }

    if(password.length < 6){
      validationErrors.push("Password needs to be more than 6 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Password does not match.")
    }

    if (validationErrors.length > 0) return setErrors(validationErrors)

    const data = await dispatch(signUp(username, email, password));
    console.log ('validation error messages ', data)
    if (data) {
      const formatedErrors = data.map(err => {
        const errMsgArr = err.split(":");
        return  errMsgArr.length >1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors)
      return
    }
    return <Redirect to='/main' />;


    // e.preventDefault();
    // if (password === repeatPassword) {
    //   const data = await dispatch(signUp(username, email, password));
    //   if (data) {
    //     //setErrors(data)
    //     console.log('get error data', data)
    //     const formatedErrors = data.map(err => {
    //       // const [_field, message] = err.split(":")
    //       // return message.slice(1)
    //       const errMsgArr = err.split(":");
    //       return  errMsgArr.length >1 ? errMsgArr.slice(1) : errMsgArr
    //     })
    //     setErrors(formatedErrors)
    //     return;
    //   }
    //   return <Redirect to='/main' />;
    // }
  };

  useEffect(() => {
    if(!hasSubmitted) return;

    let validationErrors = [];

    if (email.trim().length === 0) {
      validationErrors.push('Please enter email.')
    }

    if(!email.includes('@')) {
      validationErrors.push("Please enter correct email.")
    }

    if (username.trim().length === 0) {
      validationErrors.push('Please enter username.')
    }

    if(password.length < 6){
      validationErrors.push("Password needs to be more than 6 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Password does not match.")
    }

    setErrors(validationErrors)

  }, [email, username, password, repeatPassword])


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/main' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          //required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
