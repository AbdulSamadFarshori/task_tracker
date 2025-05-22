import { Fragment, useEffect } from "react";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function TaskAddPage(){

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
        <AddForm project={false} task={true}/>
    </Fragment>);
    }
    else if(isStaff){
        
        return (<Fragment>
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={false} LoginStatus={true}/>
            <AddForm project={false} task={true}/>
        </Fragment>);
    }
}