import { Fragment, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskDetailsById } from "../taskHttp";
import useAuthCheck from "../utilies";

export default function TaskEditPage(){

    const navigate = useNavigate();
    const paramsId = useParams();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;

    useAuthCheck();

    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let role = window.localStorage.getItem('role');

    const [taskDetail, setTaskDetail] = useState([]);
        
        useEffect(() => {
            async function fetchTaskDetailById(){
                const accessToken = window.localStorage.getItem('accessToken');
                const data = await getTaskDetailsById(paramsId.id, accessToken);
                setTaskDetail(data.data)
            }
            fetchTaskDetailById();
        }, []);
    

    if (role === "ADMIN" && Object.keys(taskDetail).length > 0){

        console.log(taskDetail)

        const {id, name, description, due_date, user, status, project } = taskDetail;

        console.log(id);

        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <EditForm 
                project={false} 
                task={true}
                id={id}
                projectName={project.project_name}
                name={name}
                description={description}
                dueDate={due_date}
                owner={user.username}
                status={status}
                />
        </Fragment>);

    }
    else if(role === "STAFF" && Object.keys(taskDetail).length > 0){
        console.log(taskDetail)
        const {id, name, description, due_date, user, status, project } = taskDetail;

    
        return (<Fragment>
            
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={false} LoginStatus={true}/>
            <EditForm 
                project={false}
                staff={true} 
                task={false}
                id={id}
                status={status}
                />
        </Fragment>);
    }
}