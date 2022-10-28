import axios from "axios";

const CLOUD_NAME = "dgjd2pva4";
const UPLOAD_PRESET = "ble7taw1";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const imageService={
    uploadImage
}
export default imageService;