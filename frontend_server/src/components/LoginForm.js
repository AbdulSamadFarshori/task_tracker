import { useState } from 'react';
import './LoginFormStyle.css'
import { checkUserCerdentials } from '../http'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SingleSignOnButton from "./SSO";



export default function LoginForm(){

    const navigate = useNavigate();


    const [userState, setUserState] = useState('')
    const [passwordState, setPasswordState] = useState('')
    
    const handleUserChange = (e) => {
        setUserState(e.target.value)
    };
    
    const handlePasswordChange = (e) => {
        setPasswordState(e.target.value)
    };
    
    async function handleSubmit(){        
        const data = {
            username: userState, 
            password: passwordState
        }
        const res = await checkUserCerdentials(data);

        if (res.status === 'success'){

            const data = res.data.data;

            const userId = data.username;
            const username = data.user_id;
            const isAdmin = data.admin;
            const isStaff = data.staff;
            const accessToken = data.access_token;
            
            window.localStorage.setItem('userId', userId);
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('isAdmin', isAdmin);
            window.localStorage.setItem('isStaff', isStaff);
            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('logged', true);

            
            navigate('/');
        }
    };

    return (<div class="login-container">
        <div class="login-card">
            <h2>Login</h2>
            <GoogleOAuthProvider clientId="774680652106-b1ucoc7nv6tplkpn9gop6hhkk3nktlm3.apps.googleusercontent.com">
                    <SingleSignOnButton/>
                </GoogleOAuthProvider>
                <br></br>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" value={userState} onChange={handleUserChange} required />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value={passwordState} onChange={handlePasswordChange} required />
                </div>

                <button class="login-btn" onClick={handleSubmit}>Login</button>
                
                
        </div>
        
    </div>);
}