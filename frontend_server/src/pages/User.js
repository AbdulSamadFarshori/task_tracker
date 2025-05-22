import { Fragment, useEffect } from "react";
import TableComponent from "../components/Table";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";

export default function UserPage(){

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

    const colData = [
        "UserID", "UserName", "Email", "Admin", "Staff", "Tasks", "Projects", "Edit", "Delete" 
    ]
    const data = [
                    {id:1, 
                    username:"Abdul Samad", 
                    email:"sumir40@gmail.com", 
                    is_admin:true, 
                    is_staff:false},
                    {id:2, 
                    username:"Abdul Sami", 
                    email:"sami@gmail.com", 
                    is_admin:false, 
                    is_staff:true},
                    {id:3, 
                    username:"Faiz Aslam", 
                    email:"Faiz@gmail.com", 
                    is_admin:false, 
                    is_staff:true}
                ]

    return (
    <Fragment>        
         <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <TableComponent user={true} col={colData} data={data}/>
    </Fragment>)


    }
    else if(isStaff){
        return <ErrorComponent />
    } 
}
