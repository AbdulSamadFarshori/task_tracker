import { localServerURL, serverURL } from "./config";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BaseURL = serverURL;

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
            return {status:'fail', data: []}
        }
        else{
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
            return {status:'fail', data: []}
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
        return {status:'fail', data: []}
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
        return {status:'fail', data: []}
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
        return {status:'fail', data: []}
    }
    else{
        return {status:'success', data: resData}
    } 

}

export async function TokenVerification(accessToken){
    const TokenVerifivcationURL = BaseURL + "/api/login/token-verification/";
    const res = await GetRequest(TokenVerifivcationURL, accessToken);
    return res.data.token_valid
} 

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isTokenVerified = async () => {
      const accessToken = localStorage.getItem('accessToken');

      const isValid = await TokenVerification(accessToken);
      console.log(isValid);

      if (!isValid) {
        localStorage.removeItem('accessToken'); // optional
        navigate('/login');
      }
    };

    isTokenVerified();
  }, [navigate]);
};

export default useAuthCheck;
