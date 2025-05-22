import {Link} from "react-router-dom"


export default function TaskRowComponent({id, name, description, dueDate, status, owner, project}){

    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{dueDate}</td>
        <td>{status}</td>
        <td>{owner}</td>
        <td>{project}</td>
        <td>
            <Link to={`/edit-task/${id}`} className="edit-btn">Edit</Link>
        </td>
        <td>
            <button class="remove-btn" onclick="removeUser(1)">Remove</button>
        </td>
    </tr>)
}