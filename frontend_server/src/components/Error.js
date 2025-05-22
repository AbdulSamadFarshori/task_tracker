import { Link } from "react-router-dom"
import "./Error.css"
export default function ErrorComponent(){
    return (<div class="not-found-container">
        <h1>404</h1>
        <p>Oops! The page you are looking for could not be found.</p>
        <p>The link might be broken, or the page may have been removed.</p>
        <Link to={`/`} className="go-home-btn">Go to Homepage</Link>
    </div>)
}