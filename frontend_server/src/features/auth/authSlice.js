import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../services/api";

export const login = createAsyncThunk('/login/', async (credentials) => {
  const res = await axios.post('/login/', credentials);
  return res.data;
})

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
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(login.pending, (state)=>{
      state.loading =true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { user, token, roles } = action.payload;
      state.user = user;
      state.token = token;
      state.roles = roles;
      state.isAuthenticated = true;
      const roleString = roles.map(r => r).join(', ');
      localStorage.setItem('token', token);
    })
    

    .addCase(googleAuth.fulfilled, (state, action) => {
      const { user, token, roles } = action.payload;
      state.user = user;
      state.token = token;
      state.roles = roles;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    })

  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;