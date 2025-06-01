import { Fragment, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";
import { getUserDetails } from "../userHttp";
import useAuthCheck from "../utilies";

export default function UserPage(){

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
    
    const [userDetails, setUserDetails] = useState([]);
        
    useEffect(()=>{
            async function fetchUserDetail(){
                const accessToken = window.localStorage.getItem('accessToken');
                console.log(accessToken);
                const data = await getUserDetails(accessToken);
                console.log(data.data)
                setUserDetails(data.data)
            }
            fetchUserDetail();
        }, []);

    if (role === "ADMIN"){
    
        const colData = [
            "ID", "UserName", "Email", "Role", "Tasks", "Projects", "Edit", "Delete" 
        ]
        
        return (
        <Fragment>        
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <TableComponent user={true} col={colData} data={userDetails}/>
        </Fragment>)


    }
    else if(role === "STAFF"){
        return <ErrorComponent />
    } 
}
