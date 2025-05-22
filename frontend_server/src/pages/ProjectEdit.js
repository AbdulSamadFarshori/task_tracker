import { Fragment, useEffect } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";

export default function ProjectEditPage(){

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


    if (isAdmin){

        const data = [
            {
                id: 1,
                name: "llp", 
                description:"new start project for testing purpose.",
                startDate: "2024-11-02",
                endDate: "2025-06-05",
                owner: "Abdul Samad",
                status:"completed"
        }]
        
        const name = data[0].name;
        const description = data[0].description;
        const startDate = data[0].startDate;
        const endDate = data[0].endDate;
        const dueDate = null;
        const owner = data[0].owner;
        const status = data[0].status;
        
        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <EditForm 
                project={true} 
                task={false}
                projectName={name}
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
        return <ErrorComponent/>

    }

}