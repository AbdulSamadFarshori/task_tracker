import { useState } from 'react';
import './LoginFormStyle.css'
import { checkUserCerdentials } from '../userHttp'
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SingleSignOnButton from "./SSO";
import InputField from './Input';
import Button from './Button';



export default function LoginForm(){

    const navigate = useNavigate();


    const [userState, setUserState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [notificationState, setNotificationState] = useState(<p></p>);

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

        console.log(res)

        function onCloseNotify(){
            const notification = <></>;
            setNotificationState(notification)

        }

        if (res.status === 'success' && res.data.status === 'ok'){

            const data = res.data;

            const userId = data.user_id;
            const username = data.username;
            const role = data.role;
            const accessToken = data.access_token;
            
            window.localStorage.setItem('userId', userId);
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('role', role);
            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('logged', true);
            
            navigate('/');
        }
        if (res.data.status === "error"){
            const notification = <div id="login-notfy-error" className="login-notfy-error"> {res.data.msg} <span class="login-notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)

        }
    };

    return (<div class="login-container">
        
        <div class="login-card">
            <h2>Login</h2>
            <div>{notificationState}</div>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                    <SingleSignOnButton/>
                </GoogleOAuthProvider>
                <br></br>
                <div class="form-group">
                    <InputField labelFor={"username"} title={"Username"} type={"text"} idName={"username"} name={"username"} onChange={handleUserChange} />                  
                </div>
                <div class="form-group">
                <InputField labelFor={"password"} title={"Password"} type={"password"} idName={"password"} name={"password"} onChange={handlePasswordChange}/>
                </div>
                <Button className={"login-btn"} onClick={handleSubmit} name={"Login"} />
                
                
        </div>
        
    </div>);
}