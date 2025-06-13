import { useEffect, useState } from 'react';
import './AddForm.css'
import { addNewUser, getUserName } from '../userHttp';
import { addNewProject, getAllProjectName } from '../projectHttp';
import { addNewTask } from '../taskHttp';
import InputField from './Input';
import DropDownBox from './DropDownInput';
import TextArea from './TextArea';
import Button from './Button';

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
    const [notificationState, setNotificationState] = useState(<p></p>); 



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

        const accessToken = window.localStorage.getItem('accessToken');
        const res = await addNewProject(payload, accessToken);

        function onCloseNotify(){
            const notification = <></>;
            setNotificationState(notification)

        }

        if (res.status === "ok"){

            setNameState('');
            setDescState('');
            setStartDateState('');
            setEndDateState('');
            setStatusState('');
            setOwnerState('');

            const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)

        }
        else{
            const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)
        }

    }
    
    return (<div className="create-project-container">
        <h2>Create New Project</h2>
        {notificationState}
        <form id="create-project-form">
            <InputField labelFor={"project-name"} title={"Name"} type={"text"} idName = {"project-name"} onChange = {nameChangeValue} value={nameState} />
            <TextArea labelFor={"project-description"} title={"Description"} idName={"project-description"} onChange={descChangeValue}  value={descState}/>
            <InputField labelFor={"project-start-date"} title={"Start Date"} type={"date"} idName = {"project-start-date"} onChange = {startDateChangeValue} value={startDateState}/>
            <InputField labelFor={"project-end-date"} title={"End Date"} type={"date"} idName = {"project-end-date"} onChange = {endDateChangeValue} value={endDateState}/>
            <DropDownBox label={"Status"} id={"project-status"} options={["NEW", "IN_PROGRESS", "COMPLETED", "NOT_STARTED"]} onChange={statusChangeValue} value={statusState} status={true} />
            <DropDownBox label={"Owner"} id={"project-status"} value={ownerState} options={userListState} onChange={ownerChangeValue} owner={true}/>
            <Button type={"button"} onClick={onSubmitNewProject} name={"Create Project"}/>
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
    const [notificationState, setNotificationState] = useState(<p></p>); 


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
    
        const res = await addNewTask(payload, accessToken);

        function onCloseNotify(){
            const notification = <></>;
            setNotificationState(notification)

        }

        if (res.status === "ok"){

            setTaskNameState('');
            setTaskDescState('');
            setdueDateState('');
            setTaskStatusState('');
            setTaskownerState('');
            setTaskProjectNameState('');

            const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)

        }
        else{
            const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)
        }

    }

    return (<div class="create-project-container">
        <h2>Create New Task</h2>
        {notificationState}
        <form id="create-project-form">
            <InputField labelFor={"project-name"} title={"Task Name"} type={"text"} idName={"project-name"} onChange={onChangeTaskName} value={taskNameState} />
            <TextArea labelFor={"project-description"} title={"Description"} idName={"project-description"} onChange={onChangeDesc} value={taskDescState}/>
            <InputField labelFor={"project-start-date"} title={"Due Date"} type={"Date"} idName={"project-start-date"} onChange={onChangeDueDate} value={dueDateState}/>
            <DropDownBox label={"Owner"} idName={"project-status"} options={userListState} onChange={onChangeOwner} value={taskownerState} owner={true} />
            <DropDownBox label={"Status"} idName={"project-status"} options={["IN_PROGRESS", "COMPLETED"]} onChange={onChangeStatus} value={taskStatusState} status={true}/>
            <DropDownBox label={"Project"} idName={"project-status"} options={projectListState} onChange={onChangeProjectName} value={taskProjectNameState} project={true} />
            <Button type={"button"} onClick={onSubmitTaskForm} name={"Create Task"}/>
    </form>
    </div>);
    }

function UserAddForm(){

    const [userNameState, setUserNameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [roleState, setRoleState] = useState('');
    const [notificationState, setNotificationState] = useState(<p></p>);

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
        
        
        function onCloseNotify(){
            const notification = <></>;
            setNotificationState(notification)

        }

        if (res.status === "ok"){

            setUserNameState('');
            setEmailState('');
            setPasswordState('');
            setRoleState('');
            
            const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)

        }
        else{
            const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
            setNotificationState(notification)
        }

    } 

    return (<div class="create-project-container">
        <br></br>
        <h2>Create New User</h2>
        {notificationState}
        <form id="create-project-form">
            <InputField labelFor={"project-name"} title={"Username"} type={"text"} idName={"project-name"} value={userNameState} onChange={usernameChangeValue} />
            <InputField labelFor={"project-name"} title={"Email"} type={"text"} idName={"project-name"} value={emailState} onChange={emailChangeValue} />
            <InputField labelFor={"project-name"} title={"Password"} type={"password"} idName={"project-name"} value={passwordState} onChange={passwordChangeValue} />
            <DropDownBox label={"Role"} idName={"project-status"} options={["ADMIN", "STAFF"]} value={roleState} onChange={roleChangeValue} status={true}/>
            <Button type={"button"} onClick={onSubmitForm} name={"Create User"}/>
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