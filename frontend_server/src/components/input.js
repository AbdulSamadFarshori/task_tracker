import { Fragment } from "react"

export default function InputField({labelFor, title, type, idName, onChange}){
   return(<Fragment> 
   <label for={labelFor}>{title}</label>
   <input type={type} id={idName} onChange={onChange} required />
   </Fragment>) 
}