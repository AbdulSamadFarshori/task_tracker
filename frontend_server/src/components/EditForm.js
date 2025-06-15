import { useEffect, useState } from 'react'
import './AddForm.css'
import { editUserDetails, getUserName } from '../userHttp';
import { getAllProjectDetails, getAllProjectName, updateProjectDetails } from '../projectHttp';
import { updateTaskDetails } from '../taskHttp';
import InputField from './Input';
import TextArea from './TextArea';
import DropDownBox from './DropDownInput';
import Button from './Button';



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
    const [notificationState, setNotificationState] = useState(<p></p>);

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

        const res = await updateProjectDetails(payload, accessToken)
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        function onCloseNotify(){
                const notification = <></>;
                setNotificationState(notification)
            }
            
            if (res.status === "ok"){
                 const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }
            else{
                const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }       
    }

    const username = window.localStorage.getItem("username");

    return <div class="create-project-container">
                    <h2>Edit Project</h2>
                    {notificationState}
            <form id="create-project-form">
                <InputField labelFor={"project-name"} title={"Project Name"} type={"text"} idName={"project-name"} value={nameEditState} onChange={nameChangeValue}/>
                <TextArea labelFor={"project-description"} title={"Description"} idName={"project-description"} value={descEditState} onChange={descChangeValue}/>
                <InputField labelFor={"project-start-date"} title={"Start Date"} type={"date"} idName={"project-start-date"} value={startDateEditState} onChange={startDateChangeValue}/>
                <InputField labelFor={"project-end-date"} title={"End Date"} type={"date"} idName={"project-end-date"} value={endDateEditState} onChange={endDateChangeValue}/>
                <DropDownBox label={"Status"} id={"project-status"} options={["NEW", "IN_PROGRESS", "COMPLETED", "NOT_STARTED"]} onChange={statusChangeValue} value={statusEditState} status={true} />
                <DropDownBox label={"Owner"} id={"project-status"} value={ownerEditState} options={[username]} onChange={ownerChangeValue} status={true}/>
                <Button type={"button"} onClick={onSubmitEditForm} name={"Save"}/>
            </form>
        </div>

        }

function StaffTaskEditForm({id, status}){
    const [statusState, setStatusState] = useState(status || '');
    const [idState, setIdState] = useState(id ||'')
    const [notificationState, setNotificationState] = useState(<p></p>);


    
    useEffect(()=>{
        setIdState(id || "");
        setStatusState(status || "");
        }, [id, status]);
    
    const onStatusChange = (e)=>{
        setStatusState(e.target.value);
    }

    async function onSubmitTaskEditFrom(){


        const payload = {
            id : idState,
            status : statusState,
        }
        const accessToken = window.localStorage.getItem('accessToken');
        const res = await updateTaskDetails(payload, accessToken);
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        function onCloseNotify(){
                const notification = <></>;
                setNotificationState(notification)
            }
            
            if (res.status === "ok"){
                 const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }
            else{
                const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }       


    }

    return <div class="create-project-container">
    <h2>Edit Task</h2>
    {notificationState}
    <form id="create-project-form">
        <DropDownBox label={"Status"} idName={"project-status"} options={["IN_PROGRESS","COMPLETED"]} value={statusState} onChange={onStatusChange}/>
        <Button type={"button"} onClick={onSubmitTaskEditFrom} name={"Save"}/>
        </form>
        </div>

    }

function TaskEditForm({id, name, description, dueDate, owner, status, projectName}){

    const [userNameListState, setUserNameListState] = useState([]);
    const [projectListState, setProjectListState] = useState([])
    const [ownerState, setOwnerState] = useState(owner || '');
    const [projectNameState, setProjectNameState] = useState(projectName || '');
    const [statusState, setStatusState] = useState(status || '');
    const [dueDateState, setDueDateState] = useState(dueDate || '');
    const [descState, setDescState] = useState(description || '');
    const [nameState, setNameState] = useState(name || '');
    const [idState, setIdState] = useState(id ||'')
    const [notificationState, setNotificationState] = useState(<p></p>);



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
            setUserNameListState(data.data);
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
        setOwnerState(e.target.value);
    }

    const onChangeProjectName = (e)=>{
        setProjectNameState(e.target.value);
    }

    async function onSubmitTaskEditFrom(){


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
        const res = await updateTaskDetails(payload, accessToken);
        window.scrollTo({ top: 0, behavior: 'instant' });

        function onCloseNotify(){
                const notification = <></>;
                setNotificationState(notification)
            }
            
            if (res.status === "ok"){
                 const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }
            else{
                const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }        

    } 

    return <div class="create-project-container">
                <h2>Edit Task</h2>
                {notificationState}
                <form id="create-project-form">
                    <InputField labelFor={"project-name"} title={"Task Name"} type={"text"} idName={"project-name"} value={nameState} onChange={onNameChange}/>
                    <TextArea labelFor={"project-description"} title={"Description"} idName={"project-description"} value={descState} onChange={onDescChange}/>
                    <InputField labelFor={"project-start-date"} title={"Due Date"} type={"date"} idName={"project-start-date"} value={dueDateState} onChange={onDueDateChange}/>
                    <DropDownBox label={"Owner"} idName={"project-status"} options={userNameListState} value={ownerState} onChange={onDescChange} owner={true}/>
                    <DropDownBox label={"Status"} idName={"project-status"} options={["IN_PROGRESS", "COMPLETED"]} value={statusState} onChange={onStatusChange} status={true}/>
                    <DropDownBox label={"Project"} idName={"project-status"} options={projectListState} value={projectNameState} onChange={onChangeProjectName} project={true}/>
                    <Button type={"button"} onClick={onSubmitTaskEditFrom} name={"Save"}/>
            </form>
        </div>

        }

    function UserEditForm({id, userName, email, role}){

        const [userNameEditState, setUserNameEditState] = useState(userName||"");
        const [emailEditState, setEmailEditState] = useState(email||"");
        const [roleEditState, setRoleEditState] = useState(role||"");

        const [passwordEditState, setPasswordEditState] = useState("");
        const [notificationState, setNotificationState] = useState(<p></p>);


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

            const accessToken = window.localStorage.getItem('accessToken');
            const res = await editUserDetails(payload, accessToken);
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            function onCloseNotify(){
                const notification = <></>;
                setNotificationState(notification)
            }
            
            if (res.status === "ok"){
                 const notification = <div id="notfy-success" className="notfy-success"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }
            else{
                const notification = <div id="notfy-error" className="notfy-error"> {res.msg} <span class="notfy-close" onClick={onCloseNotify}>&times;</span></div>;
                setNotificationState(notification)
            }


        } 

        return <div class="create-project-container">
        <h2>Edit User</h2>
        {notificationState}
        <form id="create-project-form">
            <InputField labelFor={"project-name"} title={"Username"} type={"text"} idName={"project-name"} value={userNameEditState} onChange={usenameOnChange} />
            <InputField labelFor={"project-name"} title={"Email"} type={"email"} idName={"project-name"} value={emailEditState} onChange={emailOnChange} />
            <InputField labelFor={"project-name"} title={"Password"} type={"password"} idName={"project-name"} value={passwordEditState} onChange={passwordOnChange} />
            <DropDownBox label={"Role"} idName={"project-status"} options={["ADMIN", "STAFF"]} value={roleEditState} onChange={roleOnChange}status={true} />
            <Button type={"button"} onClick={onSubmitForm} name={"Save"} />
        </form>
        </div>

    }

export default function EditForm({id, staff, project, user, task, name, description, startDate, endDate, owner, dueDate, 
                                    status, projectName, userName, email, role}){

    const staffTaskEditForm = <StaffTaskEditForm id={id} status={status}/>;
    const projectEditForm = <ProjectEditForm id={id} name={name} description={description} startDate={startDate} endDate={endDate} status={status} owner={owner} />;
    const taskEditForm = <TaskEditForm id={id} name={name} description={description} dueDate={dueDate}  owner={owner} status={status} projectName={projectName} />;
    const userEditForm = <UserEditForm id={id} userName={userName} email={email} role={role} />;

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