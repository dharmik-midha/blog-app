import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  blog: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//getAllBlogs
export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await blogService.getBlogs(token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getSingleBlog
export const getBlog = createAsyncThunk(
  "blogs/getBlog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await blogService.getBlog(id, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//createBlog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      const _id = thunkAPI.getState().auth.id;
      blog.createdBy = { _id };
      return await blogService.createBlog(blog, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//deleteBlog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      await blogService.deleteBlog(id, token);
      return { _id: id };
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//updateBlog
export const editBlog = createAsyncThunk(
  "blogs/editBlog",
  async (blog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      blog.time = new Date().toISOString();
      return await blogService.editBlog(blog.id, blog, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//likeBlog
export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (blog, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      const userId = thunkAPI.getState().auth.id;
      return await blogService.likeBlog(blog._id, userId, token);
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.blog = {};
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload.data;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch blogs";
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload.data;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch blogs";
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload.data);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create blog";
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload._id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create blog";
      })
      .addCase(editBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );
        state.blogs[index] = {
          ...state.blogs[index],
          ...action.payload,
        };
      })
      .addCase(editBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update blog";
      })

      .addCase(likeBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload.data._id
        );
        state.blogs[index] = {
          ...state.blogs[index],
          ...action.payload.data,
        };
        state.blog = action.payload.data;
      });
  },
});

export const { reset, resetState } = blogsSlice.actions;
export default blogsSlice.reducer;
