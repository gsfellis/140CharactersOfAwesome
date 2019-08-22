/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exsists') {
      setAlert(error);
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    password2: '',
  });

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    password2,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      registerUser({ firstName, lastName, userName, email, password });
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={onSubmit}>
        <div className="p-4">
          <label htmlFor="firstName">First Name</label>
          <input className="float-right" type="text" name="firstName" value={firstName} onChange={onChange} required />
        </div>
        <div className="p-4">
          <label htmlFor="lastName" >Last Name</label>
          <input className="float-right" type="text" name="lastName" value={lastName} onChange={onChange} required />
        </div>
        <div className="p-4">
          <label htmlFor="userName">Username</label>
          <input className="float-right" type="text" name="userName" value={userName} onChange={onChange} required />
        </div>
        <div className="p-4">
          <label htmlFor="email">Email</label>
          <input className="float-right" type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="p-4">
          <label htmlFor="password">Password</label>
          <input className="float-right" type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div className="p-4">
          <label htmlFor="password2">Confirm Password</label>
          <input className="float-right" type="password" name="password2" value={password2} onChange={onChange} required />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Register;
