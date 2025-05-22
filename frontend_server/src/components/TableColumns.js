import { Fragment } from "react";

export default function ColumnComponent({colNames}){
    const colData = colNames.map((item)=>(<th>{item}</th>
    ));
    
    return (<Fragment>
        {colData}
    </Fragment>
    )
}