import { useNavigate } from 'react-router-dom';
import './NavbarStyle.css'

export default function LogoutButton(){
    const navigate = useNavigate();

    function handleLogout(){
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('isAdmin');
        window.localStorage.removeItem('isStaff');
        window.localStorage.removeItem('accessToken');
        window.localStorage.setItem('logged', false);


        navigate('/login');

    }
    return (<button class="auth-btn logout" onClick={handleLogout}>Logout</button>);
}