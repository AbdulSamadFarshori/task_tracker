import './NavbarStyle.css'
import { Link} from 'react-router-dom'
import LogoutButton from './logout'

export default function Navbar({LoginStatus, ProjectStatus, UserStatus, TaskStatus}){
    const ShowSignLogout = <LogoutButton />
    const ShowSignLogin = <a href="#login" class="auth-btn">Login</a>
    const ShowProjectLink = <li><Link to={`/project`}>Projects</Link></li>
    const ShowUserLink = <li><Link to={`/user`}>Users</Link></li>
    const ShowTaskLink = <li><Link to={`/task`}>Tasks</Link></li> 

    return (<nav class="navbar">
        <div class="navbar-logo">Task-Tracker</div>
        <ul class="navbar-menu">
            <li><Link to={`/`}>Home</Link></li>
            {ProjectStatus ? ShowProjectLink : <li></li>}
            {UserStatus ? ShowUserLink : <li></li>}
            {TaskStatus ? ShowTaskLink : <li></li>}
        </ul>
        <div class="navbar-auth">
        {LoginStatus ? ShowSignLogout : ShowSignLogin} 
        
        </div>
    </nav>);
}