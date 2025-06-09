import {useNavigate} from 'react-router-dom'
import { Fragment, useEffect } from "react"
import Navbar from "../components/Navbar"
import ClipboardItem from "../components/Cards"
import FootNavbar from "../components/FootNavbar"
import useAuthCheck from '../utilies'

export default function HomePage(){

    const navigate = useNavigate();
    const logged = window.localStorage.getItem('logged');
    console.log(logged)
    const isLogged = logged === 'true' ? true : false;

    useAuthCheck();

    useEffect(() => {
        if (isLogged === false ) {
          navigate('/login');
        }
      }, [isLogged, navigate]);

    let role = window.localStorage.getItem('role');
    

    const adminView = <Fragment>
                        <Navbar LoginStatus={true} ProjectStatus={true} UserStatus={true} TaskStatus={true}/>
                        <ClipboardItem role={role}/>
                        <FootNavbar />
                    </Fragment>

    const staffView = <Fragment>
        <Navbar LoginStatus={true} ProjectStatus={false} UserStatus={false} TaskStatus={false}/>
        <ClipboardItem role={role}/>
        <FootNavbar />
    </Fragment>

    if (role === "ADMIN"){

        return adminView
    }
    if (role === "STAFF"){
        return staffView
    } 
    
}