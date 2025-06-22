import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../services/api";


export const googleAuth = createAsyncThunk('/google-auth/', async (response) => {
    const res = await axios.post('/google-auth/', {token: response.credential});
    console.log(res.data);
    return res.data
});

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  roles: [],
  isAuthenticated: false,
  error : null,
};

const authSlice = createSlice({
  name: 'auth',
  
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token, roles } = action.payload;
      state.user = user;
      state.token = token;
      state.roles = roles;
      state.isAuthenticated = true;
      const roleString = roles.map(r => r).join(', ');
      localStorage.setItem('roles', roleString)
      localStorage.setItem('logged', 'true');
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.isAuthenticated = false;
      localStorage.removeItem('logged');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(googleAuth.fulfilled, (state, action) => {
      const { user, token, roles } = action.payload;
      state.user = user;
      state.token = token;
      state.roles = roles;
      state.isAuthenticated = true;
      const roleString = roles.map(r => r).join(', ');
      localStorage.setItem('roles', roleString)
      localStorage.setItem('logged', 'true');
      localStorage.setItem('token', token);
    })

  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;