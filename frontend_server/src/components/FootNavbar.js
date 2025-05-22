import './FootNavbarStyle.css'

export default function FootNavbar(){
    return (<footer class="footer">
        <div class="footer-content">
            <p>&copy; 2025 MyApp. All rights reserved.</p>
            <ul class="footer-links">
                <li><a href="#projects">Projects</a></li>
                <li><a href="#users">Users</a></li>
                <li><a href="#login">Login</a></li>
            </ul>
        </div>
    </footer>);
}