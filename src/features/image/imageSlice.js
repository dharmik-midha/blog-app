import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageService from "./imageService";
const initialState = {
  image: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const uploadImage = createAsyncThunk(
  "image/uploadImage",
  async (file, thunkAPI) => {
    try {
      return await imageService.uploadImage(file);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.image = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset ,resetState} = imageSlice.actions;
export default imageSlice.reducer;
