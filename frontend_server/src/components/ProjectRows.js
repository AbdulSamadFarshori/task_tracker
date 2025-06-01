import { Link } from "react-router-dom";
import { deleteProjectById } from "../projectHttp";

export default function ProjectRowComponent({id, project_name, description, start_date, end_date, status, users}){

    async function removeProjectOnClick(){
        const accessToken = window.localStorage.getItem('accessToken');
        const res = await deleteProjectById(id, accessToken);
        window.location.reload();


    }

    return (
    <tr>
        <td>{id}</td>
        <td>{project_name}</td>
        <td>{description}</td>
        <td>{start_date}</td>
        <td>{end_date}</td>
        <td>{users.username}</td>
        <td>{status}</td>

        <td>
            <Link to={`/project-task/${id}`} className="edit-btn">Tasks</Link>
        </td>
        <td>
            <Link to={`/edit-project/${id}`} className="edit-btn">Edit</Link>
        </td>
        <td>
            <button class="remove-btn" onClick={removeProjectOnClick}>Remove</button>
        </td>
    </tr>)
}