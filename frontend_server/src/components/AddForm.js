import { useEffect, useState } from 'react';
import './AddForm.css'
import { addNewUser, getUserName } from '../userHttp';
import { addNewProject, getAllProjectName } from '../projectHttp';
import { addNewTask } from '../taskHttp';
import InputField from './input';
import DropDownBox from './DropDownInput';

function ProjectAddForm(){

    const [userListState, setUserListState] = useState([])

    useEffect(()=>{
        async function getAllUserName(){
            const accessToken = window.localStorage.getItem('accessToken');
            const data = await getUserName(accessToken);
            setUserListState(data.data); 
        }
        getAllUserName();
    }, []);

    const [nameState, setNameState] = useState("");
    const [descState, setDescState] = useState("");
    const [startDateState, setStartDateState] = useState("");
    const [endDateState, setEndDateState] = useState("");
    const [statusState, setStatusState] = useState("");
    const [ownerState, setOwnerState] = useState("");


    const nameChangeValue = (e)=>{
        setNameState(e.target.value);
    }

    const descChangeValue = (e)=>{
        setDescState(e.target.value);
    }

    const startDateChangeValue = (e)=>{
        setStartDateState(e.target.value);
    }

    const endDateChangeValue = (e)=>{
        setEndDateState(e.target.value);
    }

    const statusChangeValue = (e)=>{
        setStatusState(e.target.value);
    }
    const ownerChangeValue = (e)=>{
        console.log(e.target.value)
        setOwnerState(e.target.value);
    }

    async function onSubmitNewProject(){
        const payload = {
            project_name : nameState,
            description : descState,
            start_date : startDateState,
            end_date : endDateState,
            status : statusState,
            user : ownerState 

        }

        console.log(payload)

        const accessToken = window.localStorage.getItem('accessToken');
        const res = await addNewProject(payload, accessToken);
    }
    

    return (<div class="create-project-container">
        <h2>Create New Project</h2>
        <form id="create-project-form">
            <InputField labelFor={"project-name"} 
                        title={"Name"}
                        type={"text"}
                        idName = {"project-name"}
                        onChange = {nameChangeValue} />

            <InputField labelFor={"project-description"} 
                        title={"Description"}
                        type={"text"}
                        idName = {"project-name"}
                        onChange = {descChangeValue} />
            
            
            <InputField labelFor={"project-start-date"} 
                        title={"Start Date"}
                        type={"date"}
                        idName = {"project-start-date"}
                        onChange = {startDateChangeValue} />


            <InputField labelFor={"project-end-date"} 
                        title={"End Date"}
                        type={"date"}
                        idName = {"project-end-date"}
                        onChange = {endDateChangeValue} />

            <DropDownBox label={'Status'}
                        id={"project-status"}
                        options={['NEW', 'IN_PROGRESS', 'COMPLETED', 'NOT_STARTED']}
                        onChange={statusChangeValue} />

            <label for="project-status">Owner</label>
            <select id="project-status" value={ownerState} onChange={ownerChangeValue} required>
                <option value=""> </option>
                {userListState.map((data)=>(
                    <option value={data.username}>{data.username}</option>
                ))}
            </select>

            <button type="submit" onClick={onSubmitNewProject}>Create Project</button>
        </form>
    </div>);
    }

function TaskAddForm(){

    const [userListState, setUserListState] = useState([])
    const [projectListState, setProjectListState] = useState([])

    useEffect(()=>{
        async function getAllUserName(){
            const accessToken = window.localStorage.getItem('accessToken');
            const data = await getUserName(accessToken);
            const projectData = await getAllProjectName(accessToken);
            setUserListState(data.data);
            setProjectListState(projectData);
        }
        getAllUserName();
    }, []);

    const [taskNameState, setTaskNameState] = useState('');
    const [taskDescState, setTaskDescState] = useState('');
    const [dueDateState, setdueDateState] = useState('');
    const [taskStatusState, setTaskStatusState] = useState('');
    const [taskownerState, setTaskownerState] = useState('');
    const [taskProjectNameState, setTaskProjectNameState] = useState('');


    const onChangeTaskName = (e)=>{
        setTaskNameState(e.target.value);
    }
    const onChangeDesc = (e)=>{
        setTaskDescState(e.target.value);
    }
    const onChangeDueDate = (e)=>{
        setdueDateState(e.target.value);
    }
    const onChangeStatus = (e)=>{
        setTaskStatusState(e.target.value);
    }
    const onChangeOwner = (e)=>{
        setTaskownerState(e.target.value);
    }
    const onChangeProjectName = (e)=>{
        setTaskProjectNameState(e.target.value);
    }

    async function onSubmitTaskForm(){

        const accessToken = window.localStorage.getItem('accessToken');

        const payload = {
            name : taskNameState,
            description : taskDescState,
            due_date : dueDateState,
            status: taskStatusState,
            user : taskownerState,
            project : taskProjectNameState
        }
    
    console.log(payload)
    const res = await addNewTask(payload, accessToken);

    }

    return (<div class="create-project-container">
        <h2>Create New Task</h2>
        <form id="create-project-form">

            <InputField labelFor={"project-name"}
                        title={"Task Name"}
                        type={"text"}
                        idName={"project-name"}
                        onChange={onChangeTaskName}
                        />
            
            <label for="project-description">Description</label>
            <textarea id="project-description" onChange={onChangeDesc} required></textarea>
            
            <InputField labelFor={"project-start-date"}
                        title={"Due Date"}
                        type={"Date"}
                        idName={"project-start-date"}
                        onChange={onChangeDueDate}
                        />
            
            <label for="project-status">Owner</label>
            <select id="project-status" value={taskownerState} onChange={onChangeOwner} required>
                <option value=""> </option>
                {userListState.map((data)=>(
                    <option value={data.username}>{data.username}</option>
                ))}
            </select>
            
            <label for="project-status">Status</label>
            <select id="project-status" onChange={onChangeStatus} required>
                <option value=""></option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>

            <label for="project-status">Project</label>
            <select id="project-status" value={taskProjectNameState} onChange={onChangeProjectName} required>
                <option value=""> </option>
                {projectListState.map((data)=>(
                    <option value={data.project_name}>{data.project_name}</option>
                ))}
            </select>

            <button type="submit" onClick={onSubmitTaskForm}>Create Task</button>
    </form>
    </div>);
    }

function UserAddForm(){
    const [userNameState, setUserNameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [roleState, setRoleState] = useState('');

    const usernameChangeValue = (e) => {
        setUserNameState(e.target.value)
    }

    const emailChangeValue = (e) => {
        setEmailState(e.target.value)
    }

    const passwordChangeValue = (e) => {
        setPasswordState(e.target.value)
    }

    const roleChangeValue = (e) => {
        setRoleState(e.target.value)
    }

    async function onSubmitForm(){

        const payload = {
            username : userNameState,
            email : emailState,
            password : passwordState,
            role : roleState 
        }

        const accessToken = window.localStorage.getItem('accessToken');
        const res = await addNewUser(payload, accessToken);


    } 

    return (<div class="create-project-container">
        <br></br>
        <h2>Create New User</h2>
        <form id="create-project-form">
            <label for="project-name">Username</label>
            <input type="text" id="project-name" onChange={usernameChangeValue} required />

            <label for="project-name">Email</label>
            <input type="text" id="project-name" onChange={emailChangeValue} required />

            <label for="project-name">Password</label>
            <input type="password" id="project-name" onChange={passwordChangeValue} required />

            <label for="project-status">Role</label>
            <select id="project-status" onChange={roleChangeValue} required>
                <option value=""></option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
            </select>
            <button type="submit" onClick={onSubmitForm}>Create User</button>
        </form>
        </div>);
    }


export default function AddForm({project, task, user}){
    const projectAddForm = <ProjectAddForm />;
    const taskAddForm = <TaskAddForm />;
    const userAddForm = <UserAddForm />;

let AddForm = <p></p>;

if (project){
    AddForm = projectAddForm;

}
else if (task){
    AddForm = taskAddForm;
}
else if (user){
    AddForm = userAddForm;
}
return AddForm
}