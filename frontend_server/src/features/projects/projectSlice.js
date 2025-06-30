import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";


export const fetchAllProjects = createAsyncThunk('/fetch/projects', async () => {
    const res = await axios.get('/projects/');
    return res.data
});

export const addProject = createAsyncThunk('/add/project/', async (data) => {
    console.log(data);
    const res = await axios.post('/projects/', data);
    return res.data
});

export const editProject = createAsyncThunk('/edit/project/', async ({projectId, update}) => {
    const res =await axios.put(`/projects/${projectId}`, update);
    return res.data
});

export const deleteProject = createAsyncThunk('/delete/project/', async (projectId) => {
    const res =await axios.delete(`/projects/${projectId}`);
    return res.data
});

export const fetchUserProjects = createAsyncThunk('/User/projects/', async (userId) => {
    const res = await axios.get(`/projects/user/${userId}`);
    return res.data
});

export const fetchUserNames = createAsyncThunk('/User/username/', async () => {
    const res = await axios.get(`/users/username/`);
    return res.data
});

export const editProjectStatus = createAsyncThunk('/edit/project/status/', async ({projectId, update}) => {
    const res =await axios.put(`/projects/status/${projectId}`, update);
    return res.data
}); 

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        allProjects: [],
        userName: [],
        loading: false,
        error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProjects.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.allProjects = action.payload;
        })
        .addCase(fetchAllProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Something went wrong.';

        })
        .addCase(fetchUserProjects.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUserProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.allProjects = action.payload;
        })
        .addCase(fetchUserProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error?.message || 'Something went wrong.';

        })
        .addCase(addProject.fulfilled, (state, action) => {
            state.allProjects.push(action.payload);
        })
        .addCase(addProject.rejected, (state, action) => {
            state.error = action.error?.message || 'Something went wrong.';

        })
        .addCase(editProject.fulfilled, (state, action) => {
            const index = state.allProjects.findIndex((p) => p.id === action.payload.id);
            if (index !== -1){
                state.allProjects[index] = action.payload;
            }
        })
        .addCase(editProject.rejected, (state, action) => {
            state.error = action.error?.message || 'Something went wrong.';

        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state.allProjects = state.allProjects.filter((p) => p.id !== action.payload.id); 
        })

        .addCase(deleteProject.rejected, (state, action) => {
            state.error = action.error?.message || 'Something went wrong.'; 
        })

        .addCase(fetchUserNames.fulfilled, (state, action) =>{
            state.userName = action.payload;
            
        })
        .addCase(fetchUserNames.rejected, (state, action) =>{
            state.error = action.error?.message || 'Something went wrong.';
        })
        .addCase(editProjectStatus.fulfilled, (state, action) => {
            const index = state.allProjects.findIndex((p) => p.id === action.payload.id);
            if (index !== -1){
                state.allProjects[index] = action.payload;
            }
        })
        .addCase(editProjectStatus.rejected, (state, action) =>{
            state.error = action.error?.message || 'Something went wrong.';
        })
    },
});

export default projectSlice.reducer;