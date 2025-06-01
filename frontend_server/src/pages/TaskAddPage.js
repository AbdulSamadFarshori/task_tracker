import { Fragment, useEffect } from "react";
import AddForm from "../components/AddForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../utilies";

export default function TaskAddPage(){

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;

    useAuthCheck();

    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let role = window.localStorage.getItem('role');

    if (role === "ADMIN"){
    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <AddForm project={false} task={true}/>
    </Fragment>);
    }
    else if(role === "STAFF"){
        
        return (<Fragment>
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={false} LoginStatus={true}/>
            <AddForm project={false} task={true}/>
        </Fragment>);
    }
}