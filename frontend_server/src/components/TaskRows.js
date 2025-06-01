import {Link} from "react-router-dom"
import { DeleteTask } from "../taskHttp";


export default function TaskRowComponent({id, name, description, due_date, status, user, project}){

    async function DeleteTaskBYId(){

            const accessToken = window.localStorage.getItem('accessToken');
            const res = await DeleteTask(id, accessToken);
            console.log(res);
            window.location.reload();
    
        }

    return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>{due_date}</td>
        <td>{status}</td>
        <td>{user.username}</td>
        <td>{project.project_name}</td>
        <td>
            <Link to={`/edit-task/${id}`} className="edit-btn">Edit</Link>
        </td>
        <td>
            <button class="remove-btn" onClick={DeleteTaskBYId}>Remove</button>
        </td>
    </tr>)
}