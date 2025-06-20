import { BaseURL } from "./config";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export async function PostRequest(url, payload, accessToken){
    // console.log(JSON.stringify(data))
    
    if (accessToken){
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer "+  accessToken
            }
        });
        const resData = await response.json();
        if  (!response.ok){
            
            if (response.status === 403){
                return {status:'success', data: {"status": "error", "msg": "unauthorized request !!"}}
            }
            else if (response.status === 500){
                return {status:'success', data: {"status": "error", "msg": "Server Error"}}
            }
            else if (response.status === 422){
                return {status:'success', data: {"status": "error", "msg": "bad request !!"}}
            }
            else{
                return {status:'fail', data: resData}
            }
        }
        else if (response.ok){
            return {status:'success', data: resData}
        }
        
        
    }
    else{    
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type':'application/json'
            }
        });
        const resData = await response.json();
        if  (!response.ok){
            if (response.status === 403){
                return {status:'success', data: {"status": "error", "msg": "Something Went Wrong"}}
            }
            else if (response.status === 500){
                return {status:'success', data: {"status": "error", "msg": "Server Error"}}
            }
            else{
                return {status:'fail', data: resData}
            }
        }
        else{
            return {status:'success', data: resData}
        }

    }
}

export async function GetRequest(url, accessToken){
    const response = await fetch(url, {
        method: 'GET',
        headers : {
            'Authorization': "Bearer "+  accessToken,
        }
    });
    const resData = await response.json();
    
    if  (!response.ok){
        if (response.status === 403){
                return {status:'success', data: {"status": "error", "msg": "Something Went Wrong"}}
            }
            else if (response.status === 500){
                return {status:'success', data: {"status": "error", "msg": "Server Error"}}
            }
            else{
                return {status:'fail', data: resData}
            }
    }
    else{
        return {status:'success', data: resData}
    } 
}

export async function PutRequest(url, payload, accessToken){
    console.log(payload);
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type':'application/json',
            'Authorization': "Bearer "+  accessToken
        }
    });
    const resData = await response.json();
    console.log(resData);

    if  (!response.ok){
        if (response.status === 403){
                return {status:'success', data: {"status": "error", "msg": "Something Went Wrong"}}
            }
            else if (response.status === 500){
                return {status:'success', data: {"status": "error", "msg": "Server Error"}}
            }
            else{
                return {status:'fail', data: resData}
            }
    }
    else{
        return {status:'success', data: resData}
    }
}

export async function DeleteRequest(url, accessToken){
    const response = await fetch(url, {
        method: 'DELETE',
        headers : {
            'Authorization': "Bearer "+  accessToken,
        }
    });
    const resData = await response.json();
    if  (!response.ok){
        if (response.status === 403){
                return {status:'success', data: {"status": "error", "msg": "Something Went Wrong"}}
            }
            else if (response.status === 500){
                return {status:'success', data: {"status": "error", "msg": "Server Error"}}
            }
            else{
                return {status:'fail', data: resData}
            }
    }
    else{
        return {status:'success', data: resData}
    } 

}

export async function TokenVerification(accessToken){
    const TokenVerifivcationURL = BaseURL + "/api/login/token-verification/";
    const res = await GetRequest(TokenVerifivcationURL, accessToken);
    console.log(res)
    return res.data.token_valid
} 

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isTokenVerified = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const isValid = await TokenVerification(accessToken);

      if (!isValid) {
        localStorage.removeItem('accessToken'); // optional
        navigate('/login');
      }
    };

    isTokenVerified();
  }, [navigate]);
};

export default useAuthCheck;
