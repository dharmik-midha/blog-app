import axios from "axios";
const API_URL = "/api/blogs";
const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const getBlogs = async (token) => {
  const response = await axios.get(API_URL, config(token));
  return response.data;
};
const getBlog = async (id, token) => {
  const response = await axios.get(API_URL + "/" + id, config(token));
  return response.data;
};
const createBlog = async (blog, token) => {
  const response = await axios.post(API_URL, blog, config(token));
  return response.data;
};
const deleteBlog = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, config(token));
  return response.data;
};
const editBlog = async (id, blog, token) => {
  const response = await axios.patch(`${API_URL}/${id}`, blog, config(token));
  return response.data;
};
const likeBlog = async (id, userId, token) => {
  const response = await axios.patch(
    `${API_URL}/${id}/like`,
    { _id: userId },
    config(token)
  );
  return response.data;
};

const blogService = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  editBlog,
  likeBlog
};

export default blogService;
