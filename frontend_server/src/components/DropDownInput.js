import React from 'react';

export default function DropDownBox({label, idName, options, value, onChange, status, owner, project}) {

    if (status){
        return (
            <>
                <label htmlFor={idName}>{label}</label>
                <select id={idName} value={value} onChange={onChange} required>
                    <option value="">Select...</option>
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </>
        );
    }
    else if(owner){
        return <>
        <label htmlfor={idName}>{label}</label>
            <select id={idName} value={value} onChange={onChange} required>
                <option value="">Select...</option>
                {options.map((data, idx)=>(
                    <option key={idx} value={data.username}>{data.username}</option>
                ))}
            </select>
            </>
    }
    else if(project){
        return <>
        <label htmlfor={idName}>{label}</label>
            <select id={idName} value={value} onChange={onChange} required>
                <option value="">Select...</option>
                {options.map((data, idx)=>(
                    <option key={idx} value={data.project_name}>{data.project_name}</option>
                ))}
            </select>
        </>
    }
}
