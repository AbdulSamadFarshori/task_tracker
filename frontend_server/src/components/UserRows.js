import { Link } from "react-router-dom";
import { DeleteUserByIdDetails } from "../userHttp";

export default function UserRowComponent({id, username, email, role}){
    
    
    async function DeleteUserBYId(){

        const accessToken = window.localStorage.getItem('accessToken');
        const res = await DeleteUserByIdDetails(accessToken, id);
        console.log(res);
        window.location.reload();

    }


    return (
    <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{role}</td>
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
            <button class="remove-btn" onClick={DeleteUserBYId}>Remove</button>
        </td>
    </tr>)
}