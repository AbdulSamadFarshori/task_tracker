import {useNavigate} from 'react-router-dom'
import { Fragment, useEffect } from "react"
import Navbar from "../components/Navbar"
import ClipboardItem from "../components/Cards"
import FootNavbar from "../components/FootNavbar"

export default function HomePage(){

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    const isLogged = logged === 'true' ? true : false;

    console.log(isLogged);

    useEffect(() => {
        if (isLogged === false ) {
          // If logged in, navigate to the dashboard page
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let Admin = window.localStorage.getItem('isAdmin');
    let Staff = window.localStorage.getItem('isStaff');

    const isAdmin = Admin === 'true' ? true : false ;
    const isStaff = Staff === 'true' ? true : false ;


    const adminView = <Fragment>
                        <Navbar LoginStatus={true} ProjectStatus={true} UserStatus={true} TaskStatus={true}/>
                        <ClipboardItem admin={isAdmin}/>
                        <FootNavbar />
                    </Fragment>

    const staffView = <Fragment>
        <Navbar LoginStatus={true} ProjectStatus={false} UserStatus={false} TaskStatus={false}/>
        <ClipboardItem admin={isAdmin}/>
        <FootNavbar />
    </Fragment>

    if (isAdmin === true && isStaff === false){

        return adminView
    }
    if (isAdmin === false && isStaff === true){
        return staffView
    } 
    
}