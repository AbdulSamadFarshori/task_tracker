// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await axios.get('/users/');
  return res.data;
});

export const addUser = createAsyncThunk('users/add', async (updates) => {
  console.log(updates)
  const res = await axios.post(`/users/`, updates);
  return res.data;
});

export const editUser = createAsyncThunk('users/edit', async ({ id, updates }) => {
  
  const res = await axios.put(`/users/${id}`, updates);
  return res.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await axios.delete(`/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Authentication failed';
      })

      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(addUser.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error?.message || 'Authentication failed';
      })
  },
});

export default userSlice.reducer;
