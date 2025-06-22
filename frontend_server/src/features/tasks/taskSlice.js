import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';


export const fetchUserAllTasks = createAsyncThunk('tasks/fetchAllUserTask', async (userId) => {
  const res = await axios.get(`/tasks/staff/${userId}`);
  return res.data;
});

export const fetchProjectAllTasks = createAsyncThunk('tasks/project/fetchAll', async (projectId) => {
  const res = await axios.get(`/tasks/project/${projectId}`);
  return res.data;
});

export const createTask = createAsyncThunk('tasks/create', async (taskData) => {
  const res = await axios.post('/tasks/', taskData);
  return res.data;
});

export const updateTaskStatus = createAsyncThunk('tasks/updateStatus', async ({taskId, updates}) => {
  const res = await axios.put(`/tasks/${taskId}/status`, updates);
  return res.data;
});

export const deleteTask = createAsyncThunk('task/delete', async (taskId) => {
  await axios.delete(`/tasks/${taskId}`)
  return taskId
})



const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchUserAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Authentication failed';
      })
      .addCase(fetchProjectAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchProjectAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Authentication failed';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
              state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })  
  },
});

export default tasksSlice.reducer;
