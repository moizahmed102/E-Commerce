import axiosInstance from "../interceptors/axiosInstance";

const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/categories", categoryData);
  return response.data;
};

const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export { createCategory, getCategories };
