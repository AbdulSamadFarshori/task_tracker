import { Fragment, useEffect } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import ErrorComponent from "../components/Error";
import { useNavigate } from "react-router-dom";

export default function UserEditPage(){

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
            id: 3,
            userName: "Abdul Samad",
            email: "sumir40@gmail.com",
            role: "Role"

    }]
    
    const userName = data[0].userName;
    const email = data[0].email;
    const role = data[0].role;
    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <EditForm
            user={true} 
            userName={userName}
            email={email}
            role={role}
            />
    </Fragment>);
    }
    else if(isStaff){
        return <ErrorComponent />

    }

}