import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseJwt } from "../utilityFunctions";
import authService from "./authService";

//Get user from localStorage
const usr = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: usr ? usr : null,
  email: usr ? parseJwt(usr.access_token).email : null,
  id: usr ? parseJwt(usr.access_token).user_id : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error;

    return thunkAPI.rejectWithValue(message);
  }
});
export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      delete user.cPassword;
      return await authService.signup(user);
    } catch (error) {
      const message = error?.response?.data?.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.email = parseJwt(action.payload.access_token).email;
        state.id = parseJwt(action.payload.access_token).user_id;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.email = null;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.email = null;
        state.id = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
