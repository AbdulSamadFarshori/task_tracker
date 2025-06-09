import {BaseURL} from "./config";
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from "./utilies";


const loginURL = BaseURL + '/api/login/';
const UserURL = BaseURL + '/api/users/';
const UserNameURL = BaseURL + '/api/users/username/'

export async function checkUserCerdentials(payload){
    const res = await PostRequest(loginURL, payload);
    return res
}
    
export async function getUserDetails(accessToken){
    const res = await GetRequest(UserURL, accessToken);
    return res
}

export async function getUserName(accessToken){
    const res = await GetRequest(UserNameURL, accessToken);
    console.log(res)
    return res
}

export async function getUserByIdDetails(accessToken, id){
    const UserByIdURL = UserURL + id;
    const res = await GetRequest(UserByIdURL, accessToken);
    return res 

}

export async function addNewUser(payload, accessToken){
    const res = await PostRequest(UserURL, payload, accessToken);
    return res
    
}

export async function DeleteUserByIdDetails(accessToken, id){
    const UserDeleteURL = UserURL + id;
    const res = await DeleteRequest(UserDeleteURL, accessToken);
    return res
}

export async function editUserDetails(payload, accessToken){
    const res = await PutRequest(UserURL, payload, accessToken);
    return res
}