import { Link } from "react-router-dom";

export default function UserRowComponent({id, username, email, is_admin, is_staff}){
    
    const admin = is_admin ? "true" : "false";
    const staff = is_staff ? "true" : "false";
    return (
    <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{admin}</td>
        <td>{staff}</td>
        <td>
            <Link to={`/user-task/${id}`} class="edit-btn">Task</Link>
        </td>
        <td>
            <Link to={`/user-project/${id}`} class="edit-btn">Project</Link>
        </td>
        
        <td>
            <Link to={`/edit-user/${id}`} class="edit-btn">Edit</Link>
        </td>
        <td>
            <button class="remove-btn" onclick="removeUser(1)">Remove</button>
        </td>
    </tr>)
}