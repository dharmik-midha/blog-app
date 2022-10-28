import axios from "axios";

const API_URL = "/api/categories";

//Get Categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL,config);
  return response.data;
};

//exported Function
const categoriesService = {
  getCategories,
};
export default categoriesService;
