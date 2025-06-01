import { Fragment, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ErrorComponent from "../components/Error";
import { getProjectDetailsById } from "../projectHttp";
import useAuthCheck from "../utilies";


export default function ProjectEditPage(){

    const navigate = useNavigate();
    const paramsId = useParams();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;

    useAuthCheck();

    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let role = window.localStorage.getItem('role');
    
    const [projectDetail, setProjectDetail] = useState([]);
    
    useEffect(() => {
        async function fetchProjectDetailById(){
            const accessToken = window.localStorage.getItem('accessToken');
            const data = await getProjectDetailsById(accessToken,  paramsId.id);
            setProjectDetail(data.data)
        }
        fetchProjectDetailById();
    }, []);
    

    if (role === "ADMIN" && Object.keys(projectDetail).length > 0){

        console.log(projectDetail)

        const {id, project_name, description, start_date, end_date, users, status } = projectDetail;
        const owner = users.username; 
        
        return (<Fragment>
            <Navbar ProjectStatus={true} UserStatus={true} TaskStatus={true} LoginStatus={true}/>
            <EditForm

                project={true} 
                task={false}
                id={id} 
                name={project_name}
                description={description}
                startDate={start_date}
                endDate={end_date}
                owner={owner}
                status={status}
                />
        </Fragment>);
    }
    
    else if(role === "STAFF"){
        return <ErrorComponent/>

    }

}