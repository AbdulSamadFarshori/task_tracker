import { GoogleLogin } from '@react-oauth/google';
import { BaseURL } from '../config';
import { redirect, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const SingleSignOnButton = () => {
    const navigate = useNavigate();
    const responseMessage = (response) => {
        const googleToken = response.credential;
        // Send token to backend for validation
        fetch( BaseURL + '/api/google-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleToken }),
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Handle JWT, login user
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
        });
    };

    return (
        <div>
            <GoogleLogin onSuccess={responseMessage} onError={() => console.log('Login Failed')} />
        </div>
    );
};

export default SingleSignOnButton;