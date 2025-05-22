import { Fragment } from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function LoginPage(){
    return (<Fragment>
        <Navbar LoginStatus={false} ProjectStatus={false} UserStatus={false}/>
        <LoginForm/>
        
    </Fragment>);
}