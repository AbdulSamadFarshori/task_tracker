import { useEffect, useState } from 'react'
import './AddForm.css'
import { editUserDetails, getUserName } from '../userHttp';
import { getAllProjectDetails, getAllProjectName, updateProjectDetails } from '../projectHttp';
import { updateTaskDetails } from '../taskHttp';


function ProjectEditForm({id, name, description, startDate, endDate, status, owner}){


    const [userNameListState, setUserNameListState] = useState([])
    
        useEffect(()=>{
            async function getAllUserName(){
                const accessToken = window.localStorage.getItem('accessToken');
                const data = await getUserName(accessToken);
                setUserNameListState(data.data); 
            }
            getAllUserName();
        }, []);

    const [nameEditState, setNameEditState] = useState(name||"");
    const [descEditState, setDescEditState] = useState(description||"");
    const [startDateEditState, setStartDateEditState] = useState(startDate||"");
    const [endDateEditState, setEndDateEditState] = useState(endDate||"");
    const [statusEditState, setStatusEditState] = useState(status||"");
    const [ownerEditState, setOwnerEditState] = useState(owner||"");

    useEffect(() => {
        setNameEditState(name || "");
        setDescEditState(description || "");
        setStartDateEditState(startDate || "");
        setEndDateEditState(endDate || "");
        setStatusEditState(status || "");
        setOwnerEditState(owner || "");

    }, [name, description, startDate, endDate, status, owner]);

    const nameChangeValue = (e)=>{
        setNameEditState(e.target.value);
    }

    const descChangeValue = (e)=>{
        setDescEditState(e.target.value);
    }

    const startDateChangeValue = (e)=>{
        setStartDateEditState(e.target.value);
    }

    const endDateChangeValue = (e)=>{
        setEndDateEditState(e.target.value);
    }

    const statusChangeValue = (e)=>{
        setStatusEditState(e.target.value);
    }
    const ownerChangeValue = (e)=>{
        setOwnerEditState(e.target.value);
    }

    console.log(statusEditState);

    async function onSubmitEditForm(){
        const accessToken = window.localStorage.getItem('accessToken');
        const payload = {
            id : id,
            project_name : nameEditState,
            description : descEditState,
            start_date : startDateEditState,
            end_date : endDateEditState,
            status : statusEditState,
            owner : ownerEditState
        }

        console.log(payload);

        const res = await updateProjectDetails(payload, accessToken)
        console.log();

    }

    return <div class="create-project-container">
                    <h2>Edit Project</h2>
            <form id="create-project-form">
                <label for="project-name">Project Name</label>
                <input type="text" id="project-name" value={nameEditState} onChange={nameChangeValue} />
                
                <label for="project-description">Description</label>
                <textarea id="project-description" value={descEditState} onChange={descChangeValue}></textarea>
                
                <label for="project-start-date">Start Date</label>
                <input type="date" id="project-start-date" value={startDateEditState} onChange={startDateChangeValue}/>
                
                <label for="project-end-date">End Date</label>
                <input type="date" id="project-end-date" value={endDateEditState} onChange={endDateChangeValue}/>
                
                <label for="project-status">Status</label>
                <select id="project-status" value={statusEditState} onChange={statusChangeValue}>
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="NOT_STARTED">Not Started</option>
                </select>

                <label for="project-status">Owner</label>
                <select id="project-status" value={ownerEditState} onChange={ownerChangeValue}>

                    {userNameListState.map((data)=>(
                        <option value={data.username}>{data.username}</option>
                        ))}
                </select>

                <button type="submit" onClick={onSubmitEditForm}>Save</button>
            </form>
        </div>

        }

function StaffTaskEditForm({id, status}){
    const [statusState, setStatusState] = useState(status || '');
    const [idState, setIdState] = useState(id ||'')

    
    useEffect(()=>{
        setIdState(id || "");
        setStatusState(status || "");
        }, [id, status]);
    
    const onStatusChange = (e)=>{
        setStatusState(e.target.value);
    }

    async function onSubmitTaskEditFrom(){

        console.log(idState);

        const payload = {
            id : idState,
            status : statusState,
        }
        const accessToken = window.localStorage.getItem('accessToken');
        const res = await updateTaskDetails(payload, accessToken);
    }

    return <div class="create-project-container">
    <h2>Edit Task</h2>
    <form id="create-project-form">
        
        <label for="project-status">Status</label>
        <select id="project-status" value={statusState} onChange={onStatusChange} required>
            <option value=""></option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
        </select>

        <button type="submit" onClick={onSubmitTaskEditFrom}>Save</button>
        </form>
        </div>

    }

function TaskEditForm({id, name, description, dueDate, owner, status, projectName}){
    console.log(id);

    const [userNameListState, setUserNameListState] = useState([]);
    const [projectListState, setProjectListState] = useState([])
    const [ownerState, setOwnerState] = useState(owner || '');
    const [projectNameState, setProjectNameState] = useState(projectName || '');
    const [statusState, setStatusState] = useState(status || '');
    const [dueDateState, setDueDateState] = useState(dueDate || '');
    const [descState, setDescState] = useState(description || '');
    const [nameState, setNameState] = useState(name || '');
    const [idState, setIdState] = useState(id ||'')


    useEffect(()=>{
        setIdState(id || "")
        setNameState(name || "");
        setDescState(description || "");
        setDueDateState(dueDate || "");
        setProjectNameState(projectName || "");
        setStatusState(status || "");
        setOwnerState(owner || "");
    }, [name, description, dueDate, owner, status, projectName]);

    useEffect(()=>{
        async function getAllUserName(){
            const accessToken = window.localStorage.getItem('accessToken');
            const data = await getUserName(accessToken);
            const projectData = await getAllProjectName(accessToken);
            setUserNameListState(data);
            setProjectListState(projectData); 
        }
        getAllUserName();
    }, []);

    const onNameChange = (e)=>{
        setNameState(e.target.value);
    }
    const onDescChange = (e)=>{
        setDescState(e.target.value);
    }
    const onDueDateChange = (e)=>{
        setDueDateState(e.target.value);
    }
    const onStatusChange = (e)=>{
        setStatusState(e.target.value);
    }
    const onOwnerChange = (e)=>{
        console.log(e.target.value);

        setOwnerState(e.target.value);
    }

    const onChangeProjectName = (e)=>{
        setProjectNameState(e.target.value);
    }

    async function onSubmitTaskEditFrom(){

        console.log(idState);

        const payload = {
            id : idState,
            name : nameState,
            description : descState,
            due_date : dueDateState,
            status : statusState,
            user : ownerState,
            project : projectNameState
        }
        const accessToken = window.localStorage.getItem('accessToken');
        console.log(payload);
        const res = await updateTaskDetails(payload, accessToken);
        

    } 

    return <div class="create-project-container">
                <h2>Edit Task</h2>
                <form id="create-project-form">
                    <label for="project-name">Task Name</label>
                    <input type="text" id="project-name" value={nameState} onChange={onNameChange} required />
                    
                    <label for="project-description">Description</label>
                    <textarea id="project-description" value={descState} onChange={onDescChange} required></textarea>
                    
                    <label for="project-start-date">Due Date</label>
                    <input type="date" id="project-start-date" value={dueDateState} onChange={onDueDateChange} required />
                    
                    <label for="project-status">Owner</label>
                    <select id="project-status" value={ownerState} onChange={onOwnerChange}>
                    <option value=""> </option>
                    {userNameListState.map((data)=>(
                        <option value={data.username}>{data.username}</option>
                        ))}
                </select>

                    <label for="project-status">Status</label>
                    <select id="project-status" value={statusState} onChange={onStatusChange} required>
                        <option value=""></option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>

                    <label for="project-status">Project</label>
                    <select id="project-status" value={projectNameState} onChange={onChangeProjectName} required>
                        <option value=""> </option>
                        {projectListState.map((data)=>(
                            <option value={data.project_name}>{data.project_name}</option>
                        ))}
                    </select>

                    <button type="submit" onClick={onSubmitTaskEditFrom}>Save</button>
            </form>
        </div>

        }

    function UserEditForm({id, userName, email, role}){

        const [userNameEditState, setUserNameEditState] = useState(userName||"");
        const [emailEditState, setEmailEditState] = useState(email||"");
        const [roleEditState, setRoleEditState] = useState(role||"");

        const [passwordEditState, setPasswordEditState] = useState("");

        useEffect(() => {
            setUserNameEditState(userName || "");
            setEmailEditState(email || "");
            setRoleEditState(role || "");
        }, [userName, email, role]);

        const usenameOnChange = (e) => {
            setUserNameEditState(e.target.value)
        }
        const emailOnChange = (e) => {
            setEmailEditState(e.target.value)
        }
        const passwordOnChange = (e) => {
            setPasswordEditState(e.target.value)
        }
        const roleOnChange = (e) => {
            setRoleEditState(e.target.value)
        }

        async function onSubmitForm(){
            const payload = {
                id : id,
                username : userNameEditState,
                email : emailEditState,
                password : passwordEditState,
                role : roleEditState

            }

            console.log(payload);

            const accessToken = window.localStorage.getItem('accessToken');
            const res = await editUserDetails(payload, accessToken);

        } 

        return <div class="create-project-container">
        <h2>Edit User</h2>
        <form id="create-project-form">
            <label for="project-name">Username</label>
            <input type="text" id="project-name" value={userNameEditState} onChange={usenameOnChange} />

            <label for="project-name">Email</label>
            <input type="text" id="project-name" value={emailEditState} onChange={emailOnChange} />

            <label for="project-name">Password</label>
            <input type="password" id="project-name" onChange={passwordOnChange} />

            <label for="project-status">Role</label>
            <select id="project-status" value={roleEditState} onChange={roleOnChange}>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
            </select>
            <button type="submit" onClick={onSubmitForm}>Save</button>
        </form>
        </div>

    }

export default function EditForm({id, staff, project, user, task, name, description, startDate, endDate, owner, dueDate, 
                                    status, projectName, userName, email, role}){

    const staffTaskEditForm = <StaffTaskEditForm
                                id={id}
                                status={status} />;
    
    const projectEditForm = <ProjectEditForm
                                id = {id}
                                name={name} 
                                description={description} 
                                startDate={startDate} 
                                endDate={endDate} 
                                status={status} 
                                owner={owner} />;

    const taskEditForm = <TaskEditForm
                            id={id}
                            name={name} 
                            description={description} 
                            dueDate={dueDate} 
                            owner={owner} 
                            status={status} 
                            projectName={projectName} />;

    const userEditForm = <UserEditForm
                            id = {id}
                            userName={userName} 
                            email={email}
                            role={role} />;

let AddForm = <p></p>;

if (project){
    AddForm = projectEditForm;
}
else if (task){
    AddForm = taskEditForm;
}

else if (user){
    AddForm = userEditForm;
}
else if (staff){
    AddForm = staffTaskEditForm;
}

return AddForm
}