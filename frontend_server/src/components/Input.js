import { Fragment } from "react"

export default function InputField({labelFor, title, type, idName, name, value, onChange}){
   return(<Fragment> 
   <label for={idName}>{title}</label>
   <input type={type} id={idName} name={name} value={value} onChange={onChange} autoComplete="off" required />
   </Fragment>) 
}