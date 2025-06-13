import {Link} from "react-router-dom"
import { DeleteTask } from "../taskHttp";


export default function TaskRowComponent({id, name, description, due_date, status, user, project}){

    const role = window.localStorage.getItem('role');

    const hasDatePassed = (dateString) => {
        const givenDate = new Date(dateString);
        const now = new Date();
      
        return givenDate < now;
      };

    async function DeleteTaskBYId(){

            const accessToken = window.localStorage.getItem('accessToken');
            const res = await DeleteTask(id, accessToken);
            window.location.reload();
    
        }

    return (
    <tr>
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{id}</b></td> : <td>{id}</td>}
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{name}</b></td> : <td>{name}</td>}
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{description}</b></td> : <td>{description}</td>} 
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{due_date}</b></td> : <td>{due_date}</td>}
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{status}</b></td> : <td>{status}</td>}
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{user.username}</b></td> : <td>{user.username}</td>}
        {status === "IN_PROGRESS" && hasDatePassed(due_date) ? <td style={{ color: "red" }}><b>{project.project_name}</b></td> : <td>{project.project_name}</td>}
        <td>
            <Link to={`/edit-task/${id}`} className="edit-btn">Edit</Link>
        </td>
        <td>
            {role === "ADMIN" ? <button class="remove-btn" onClick={DeleteTaskBYId} >Remove</button> : <button class="remove-btn" onClick={DeleteTaskBYId} disabled>Remove</button>}
        </td>
    </tr>)
}