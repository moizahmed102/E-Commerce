import axiosInstance from "../interceptors/axiosInstance";

const signupUser = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

const getProfile = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("token");
};

export { signupUser, loginUser, getProfile, logoutUser };
