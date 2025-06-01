import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTaskDetails, getProjectTaskDetails, getstaffTaskDetails } from "../taskHttp";
import useAuthCheck from "../utilies";
import { getstaffProjectDetails } from "../projectHttp";


export default function TaskPage(){

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
    const idParams = useParams();

    const [taskDeatailList, setTaskDetailList] = useState([]);

    
    useEffect(()=>{
        async function fetchTaskDetails(){
            if (idParams.projectId && role === "ADMIN"){
                console.log("projectId");
                const accessToken = window.localStorage.getItem('accessToken');
                const res = await getProjectTaskDetails(idParams.projectId, accessToken);
                setTaskDetailList(res.data);

            }
            else if(idParams.userId && role === "ADMIN"){
                console.log("userId");
                const accessToken = window.localStorage.getItem('accessToken');
                const res = await getstaffTaskDetails(idParams.userId, accessToken);
                console.log(res.data)
                setTaskDetailList(res.data);        

            }
            else if(role === 'STAFF'){
                console.log('staff');
                const staffId = window.localStorage.getItem('userId');
                const accessToken = window.localStorage.getItem('accessToken');
                const res = await getstaffTaskDetails(staffId, accessToken);
                console.log(res);
                setTaskDetailList(res.data);

            } 
            else if (role === "ADMIN"){
                const accessToken = window.localStorage.getItem('accessToken');
                const res = await getAllTaskDetails(accessToken);
                console.log(res.data);
                setTaskDetailList(res.data);
            }
        }
    fetchTaskDetails();
    }, [])

    if (role === "ADMIN"){

        const colData = ["TaskID", "Name", "Description", "Due-Date", "Status", "Owner", "Project", "Edit", "Delete"];

        
        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <TableComponent task={true} col={colData} data={taskDeatailList}/>
            
            
        </Fragment>)

    }
    else if(role === "STAFF"){
    
        const colData = ["TaskID", "Name", "Description", "Due-Date", "Status", "Owner", "Project", "Edit", "Delete"];
        
        return (<Fragment>
            <Navbar ProjectStatus={false} UserStatus={false} TaskStatus={false} LoginStatus={true}/>
            <TableComponent task={true} col={colData} data={taskDeatailList}/>
            </Fragment>)
    }
    

    
}