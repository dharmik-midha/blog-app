import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "./categoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await categoriesService.getCategories(token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading=false;
        state.isError = true;
        state.message = action.payload || "Failed To fetch Categories";
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
