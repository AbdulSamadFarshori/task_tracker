import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { useParams, useNavigate } from "react-router-dom";
import ErrorComponent from "../components/Error";
import { getAllProjectDetails, getstaffProjectDetails } from "../projectHttp";
import useAuthCheck, { TokenVerification } from "../utilies";


export default function ProjectPage(){

    const [projectDetails, setProjectDetails] = useState([]);

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;
    const paramsId = useParams();

    useAuthCheck();

     useEffect(() => {
            async function isTokenVerified(){
                const accessToken = window.localStorage.getItem('accessToken');
                const res = await TokenVerification(accessToken);
                if (res === false){
                    navigate('/login');
                }
            }
            isTokenVerified()
        }, []);


    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let role = window.localStorage.getItem('role');
    
    useEffect(()=>{
        if (paramsId.userId){
            console.log("userId");
            async function fetchUserProjectDetails(){
                const accessToken = window.localStorage.getItem('accessToken');
                const data = await getstaffProjectDetails(paramsId.userId, accessToken);
                setProjectDetails(data.data)

            }
            fetchUserProjectDetails();
        }
        else{
            async function fetchProjectDetail(){
                const accessToken = window.localStorage.getItem('accessToken');
                console.log(accessToken);
                const data = await getAllProjectDetails(accessToken);
                console.log(data.data)
                setProjectDetails(data.data)
            }
            fetchProjectDetail();
        
        }
    }, []); 



    if (role === "ADMIN"){
       
        
    const colData = ["ID", "Name", "Description", "Start-Date", "End-Date", "Owner", "Status", "Task", "Edit", "Delete"]
    
    
    return (<Fragment>
        <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
        <TableComponent project={true} col={colData} data={projectDetails}/>

        
    </Fragment>)
    }
    
    else if(role === "STAFF"){
        return <ErrorComponent />

    }
}

    