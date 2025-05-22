import { GoogleLogin } from '@react-oauth/google';


const SingleSignOnButton = () => {
    const responseMessage = (response) => {
        const googleToken = response.credential;
        // Send token to backend for validation
        fetch('http://127.0.0.1:5000/google-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleToken }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle JWT, login user
                localStorage.setItem('jwt', data.token);
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