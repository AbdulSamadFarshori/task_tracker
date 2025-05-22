import { Fragment, useEffect } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function TaskEditPage(){

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;

    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let Admin = window.localStorage.getItem('isAdmin');
    let Staff = window.localStorage.getItem('isStaff');

    const isAdmin = Admin === 'true' ? true : false ;
    const isStaff = Staff === 'true' ? true : false ;

    const data = [
        {
            id: 3,
            name: "llp", 
            description:"new start project for testing purpose.",
            dueDate: "2024-11-02",
            owner: "Abdul Samad",
            status:"completed",
            projectName:"project1"
    }]
    
    const name = data[0].name;
    const projectName = data[0].projectName
    const description = data[0].description;
    const startDate = data[0].startDate;
    const endDate = data[0].endDate;
    const dueDate = data[0].dueDate
    const owner = data[0].owner;
    const status = data[0].status;

    if (isAdmin){

        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <EditForm 
                project={false} 
                task={true}
                projectName={projectName}
                name={name}
                description={description}
                startDate={startDate}
                endDate={endDate}
                dueDate={dueDate}
                owner={owner}
                status={status}
                />
        </Fragment>);

    }
    else if(isStaff){
    
        return (<Fragment>
            
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={true} LoginStatus={true}/>
            <EditForm 
                project={false} 
                task={true}
                projectName={projectName}
                name={name}
                description={description}
                startDate={startDate}
                endDate={endDate}
                dueDate={dueDate}
                owner={owner}
                status={status}
                />
        </Fragment>);
    }
}