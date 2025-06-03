import {BaseURL} from "./config";
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from "./utilies";


const projectURL = BaseURL + "/api/projects/";
const projectNameURL = BaseURL + "/api/projects/project-name/";

export async function getAllProjectDetails(accessToken){
    const res = await GetRequest(projectURL, accessToken);
    return res
}

export async function addNewProject(payload, accessToken){
    const res = await PostRequest(projectURL, payload, accessToken);
    return res
}

export async function getProjectDetailsById(accessToken, id){
    const projectIdURL = projectURL +  id;
    const res = await GetRequest(projectIdURL, accessToken);
    return res
}

export async function updateProjectDetails(payload, accessToken){
    const res = await PutRequest(projectURL, payload, accessToken);
    return res
}

export async function deleteProjectById(id, accessToken){
    const projectDeletedURL =  projectURL + id;
    const res = await DeleteRequest(projectDeletedURL, accessToken);
    return res
}

export async function getAllProjectName(accessToken){
    const res = await GetRequest(projectNameURL, accessToken);
    return res.data

}

export async function getstaffProjectDetails(userId, accessToken){
    const StaffProjectURL = projectURL + 'user-project/' + userId;
    const res = await GetRequest(StaffProjectURL, accessToken);
    return res
}







