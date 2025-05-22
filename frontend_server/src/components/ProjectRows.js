import { Link } from "react-router-dom";

export default function ProjectRowComponent({id, name, description, startDate, endDate, status, owner}){

    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{owner}</td>
        <td>{status}</td>

        <td>
            <Link to={`/task/${id}`} className="edit-btn">Tasks</Link>
        </td>
        <td>
            <Link to={`/edit-project/${id}`} className="edit-btn">Edit</Link>
        </td>
        <td>
            <button class="remove-btn" onclick="removeUser(1)">Remove</button>
        </td>
    </tr>)
}