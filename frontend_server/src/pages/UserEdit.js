import { Fragment, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import ErrorComponent from "../components/Error";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByIdDetails } from "../userHttp";
import useAuthCheck from "../utilies";

export default function UserEditPage(){

    const paramsId = useParams();
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
    
    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        async function fetchUserDetailById(){
            const accessToken = window.localStorage.getItem('accessToken');
            console.log(accessToken)
            const data = await getUserByIdDetails(accessToken,  paramsId.userId);
            setUserDetail(data)
        }
        fetchUserDetailById();
    }, []);


    
    if (role === "ADMIN"){

        const dataObject = userDetail;
        let userName = "";
        let email = "";
        let role = "";

        if (dataObject.data){
            
            console.log(dataObject);

            userName = dataObject.data.username;
            email = dataObject.data.email;
            role = dataObject.data.role
        }

    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <EditForm
            user={true}
            id = {paramsId.userId} 
            userName={userName}
            email={email}
            role={role}
            />
    </Fragment>);
    }
    else if(role === "STAFF"){
        return <ErrorComponent />

    }

}