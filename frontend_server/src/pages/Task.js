import Navbar from "../components/Navbar";
import { Fragment, useEffect } from "react";
import TableComponent from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskPage(){

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


    const idParams = useParams();
    
    if (isAdmin){
        let data = [];

        if (idParams.id){
            console.log("id");
            // create api which fetch all tasks which related to that project
        }
        else if(idParams.userId){
            console.log("userId")
        } 
        else{
            console.log("no");
            data = [
                {
                id: 1,
                name: "task-1", 
                description:"new start project for testing purpose.",
                dueDate: "11-02-2025",
                owner: "Abdul Samad",
                status:"in-progress",
                project: "Project-3"
            },
                {
                id: 2,
                name: "task-2", 
                description:"new start project for testing purpose.",
                dueDate: "11-02-2025",
                owner: "Abdul Samad",
                status:"in-progress",
                project: "Project-1"
            },
                {
                id: 3,
                name: "task-3", 
                description:"new start project for testing purpose.",
                dueDate: "11-02-2025",
                owner: "Abdul Samad",
                status:"completed",
                project: "Project-2"
            }
            ]
        }

        const colData = ["TaskID", "Name", "Description", "Due-Date", "Status", "Owner", "Project", "Edit", "Delete"];
        
        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <TableComponent task={true} col={colData} data={data}/>
            
            
        </Fragment>)

    }
    else if(isStaff){

        let userId = window.localStorage.getItem('userId');

        // fatch userId Data


        const data = [];

    
        const colData = ["TaskID", "Name", "Description", "Due-Date", "Status", "Owner", "Project", "Edit", "Delete"];
        
        return (<Fragment>
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={false} LoginStatus={true}/>
            <TableComponent task={true} col={colData} data={data}/>
            </Fragment>)
    }
    

    
}