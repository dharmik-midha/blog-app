import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import categoryReducer from "./categories/categorySlice";
import blogReducer from "./blogs/blogSlice";
import imageReducer from "./image/imageSlice";

// eslint-disable-next-line import/no-anonymous-default-export
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    image: imageReducer,
    category: categoryReducer,
  },
});
