import Navbar from "../components/Navbar";
import { Fragment, useEffect } from "react";
import TableComponent from "../components/Table";
import { useParams, useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";


export default function ProjectPage(){

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;
    const paramsId = useParams();


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

    let data = [];

    if (paramsId.userId){
        console.log('userId')

    }
    else{
        data = [
            {
            id: 1,
            name: "Project-1", 
            description:"new start project for testing purpose.",
            startDate: "12-04-2025",
            endDate: "23-07-2025",
            owner: "Abdul Samad",
            status:"in-progress"},
            {
            id: 2,
            name: "Project-2", 
            description:"new start project for testing purpose.",
            startDate: "12-05-2025",
            endDate: "21-09-2025",
            owner: "Abdul Samad",
            status:"in-progress"},
            {
            id: 3,
            name: "Project-3", 
            description:"new start project for testing purpose.",
            startDate: "11-02-2025",
            endDate: "05-06-2025",
            owner: "Abdul Samad",
            status:"completed"}
        ]
    }

    const colData = ["ProjectID", "Name", "Description", "Start-Date", "End-Date", "Owner", "Status", "Task", "Edit", "Delete"]
    
    
    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <TableComponent project={true} col={colData} data={data}/>

        
    </Fragment>)
    }
    
    else if(isStaff){
        return <ErrorComponent />

    }
}

    