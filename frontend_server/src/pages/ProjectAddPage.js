import { Fragment, useEffect } from "react";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";

export default function ProjectAddPage(){
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
    
    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <AddForm project={true} task={false} />
    </Fragment>);
    }
    else if(isStaff){
        return <ErrorComponent />
        
    }

}