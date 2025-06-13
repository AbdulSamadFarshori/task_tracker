import { Fragment } from "react"

export default function TextArea({labelFor, title, value, idName, onchange}){
    return(<Fragment> 
    <label for={labelFor}>{title}</label>
    <textarea id={idName} onChange={onchange} value={value} required></textarea>
    </Fragment>);
}