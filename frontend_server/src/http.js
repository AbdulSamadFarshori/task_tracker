


export async function checkUserCerdentials(data){
    console.log(JSON.stringify(data))
    const response = await fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    });

    const resData = await response.json();

    if  (!response.ok){
        return {status:'fail', data: undefined}
    }
    else{
        return {status:'success', data: resData}
    }

    
}