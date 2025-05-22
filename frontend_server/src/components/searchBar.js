import { Link } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar({project, task, user}){
    
    let buttnComp = <p></p>;

    if (project){
        buttnComp = <Link to={`/create-project`} className="create-btn">Add Project</Link>;
    }
    else if (task){
        buttnComp = <Link to={`/create-task`} className="create-btn">Add Task</Link>; 
    }
    else if (user){
        buttnComp = <Link to={`/create-user`} className="create-btn">Add User</Link>   
         }
    
    return (<div class="search-create-container">
        {buttnComp}
    </div>)
}