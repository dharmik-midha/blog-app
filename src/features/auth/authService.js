import axios from "axios";

const API_URL = "/api/users";

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
};


//signup user
const signup = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//exported Function
const authService = {
  login,
  logout,
  signup
};
export default authService;
