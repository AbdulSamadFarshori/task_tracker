export default function Button({type, className, idName, onClick, name}){
    return <button type={type} className={className} id={idName} onClick={onClick}>{name}</button>
}