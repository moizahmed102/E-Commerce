import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../../services/authService";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      return await signupUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await loginUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      logoutUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.jwtauthtoken;
        localStorage.setItem("token", action.payload.jwtauthtoken);
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.jwtauthtoken;
        localStorage.setItem("token", action.payload.jwtauthtoken);
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
