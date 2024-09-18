import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser, loginUser, getProfile } from "../../services/authService";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      thunkAPI.dispatch(getProfileAsync());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Signup failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      thunkAPI.dispatch(getProfileAsync());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Fetching profile failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // Check token from localStorage
    isAuthenticated: !!localStorage.getItem("token"), // Set isAuthenticated based on token presence
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.jwtauthtoken;
        localStorage.setItem("token", action.payload.jwtauthtoken); // Store token in localStorage
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.jwtauthtoken;
        localStorage.setItem("token", action.payload.jwtauthtoken); // Store token in localStorage
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.error = null;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true; // Ensure user stays authenticated when fetching profile
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload || "Signup failed";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
