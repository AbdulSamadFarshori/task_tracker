import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from '../../services/api';
import { loginSuccess, googleAuth} from './authSlice';
import { useNavigate } from 'react-router-dom';
import { BaseURL, key } from '../../config';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import './login.css';



function SingleSignOnButton(){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { error } = useSelector(state => state.auth);

    const responseMessage = (response) => {
        dispatch(googleAuth(response)).then(navigate('/dashboard'));
        
        
    }
      return (
    <div>
        <GoogleLogin onSuccess={responseMessage} onError={() => console.log('Login Failed')} />
    </div>)
   
    };

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BaseURL + '/login/', { username, password });
      const { user, token, roles } = res.data;

      dispatch(loginSuccess({ user, token, roles }));
      navigate('/dashboard');
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="login-container">

      <GoogleOAuthProvider clientId={key}>
        <SingleSignOnButton/>
      </GoogleOAuthProvider>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;