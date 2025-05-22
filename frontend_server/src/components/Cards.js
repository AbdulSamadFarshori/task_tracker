import { Fragment } from 'react';
import './CardStyle.css'
import SingleCard from './SingleCard';


export default function ClipboardItem({admin}){

    const admincards = <Fragment>
        <SingleCard title={"Projects"} description={"View, create, and manage your projects efficiently."} link={"/project"}/>
        <SingleCard title={"Users"} description={"Browse user data, roles, and add new user."} link={"/user"}/>
    </Fragment>


    return (<div class="card-container">
        {admin===true ? admincards : <div></div>}
        <SingleCard title={"Tasks"} description={"View, create, and manage your tasks efficiently."} link={"/task"}/>
    </div>
    );
}