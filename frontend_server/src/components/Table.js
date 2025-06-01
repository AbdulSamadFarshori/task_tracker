
import UserRowComponent from "./UserRows"
import ColumnComponent from "./TableColumns";
import "./Table.css"
import ProjectRowComponent from "../components/ProjectRows";
import TaskRowComponent from "../components/TaskRows";
import SearchBar from "./searchBar";


export default function TableComponent({user, project, task, col, data}){

    let rowData = null;
    let title = null;
    let addButton = null;

    if (user){

       title = "User Details"
       rowData = data.map((item, index)=>(<UserRowComponent {...item}/>));
       addButton = <SearchBar project={false} task={false} user={true}/>;

    }
    else if(project){
        title = "Project Details"
        rowData = data.map((item, index)=>(<ProjectRowComponent {...item}/>));
        addButton = <SearchBar project={true} task={false} user={false}/>;
        
    }

    else if(task){
        title = "Task Details"
        rowData = data.map((item, index)=>(<TaskRowComponent {...item}/>));
        addButton = <SearchBar project={false} task={true} user={false}/>;
    }
    
    return (<div class="users-container">
        <h2>{title}</h2>
        {addButton}
        <table class="users-table">
            <thead>
                <tr>
                    <ColumnComponent colNames={col}/> 
                </tr>
            </thead>
            <tbody id="users-table-body">
                {rowData}
            </tbody>
        </table>
        </div>)
}