import { Fragment } from "react"

export default function TextArea({labelFor, title, value, idName, onChange}){
    return(<Fragment> 
    <label for={labelFor}>{title}</label>
    <textarea id={idName} value={value} onChange={onChange} ></textarea>
    </Fragment>);
}