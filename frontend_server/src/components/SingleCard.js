import { Link } from "react-router-dom";

export default function SingleCard({title, description, link}){
    return (<div class="card">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={link} className="card-btn">Go to {title}</Link>
    </div>);
}