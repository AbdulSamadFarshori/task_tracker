import {BaseURL} from "./config";
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from "./utilies";


const TaskURL = BaseURL + '/api/tasks/'

export async function getAllTaskDetails(accessToken){
    const res = await GetRequest(TaskURL, accessToken);
    return res
}

export async function addNewTask(payload, accessToken){
    const res = await PostRequest(TaskURL, payload, accessToken);
    return res.data
}

export async function getTaskDetailsById(id, accessToken){
    const TaskIdURL = TaskURL + id
    const res = await GetRequest(TaskIdURL, accessToken);
    return res
}

export async function updateTaskDetails(payload, accessToken){
    const res = await PutRequest(TaskURL, payload, accessToken);
    return res.data
}

export async function DeleteTask(id, accessToken){
    const TaskIdURL = TaskURL + id
    const res = await DeleteRequest(TaskIdURL, accessToken);
    return res
}

export async function getstaffTaskDetails(user_id, accessToken){
    const TaskStaffURL = TaskURL + 'staff/' + user_id;
    const res = await GetRequest(TaskStaffURL, accessToken);
    return res
}

export async function getProjectTaskDetails(project_id, accessToken){
    const TaskProjectURL = TaskURL +'project/' + project_id;
    const res = await GetRequest(TaskProjectURL, accessToken);
    return res

} 
