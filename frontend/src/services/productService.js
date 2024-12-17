import axiosInstance from "../interceptors/axiosInstance";

const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};

const getProducts = async (queryParams) => {
  const response = await axiosInstance.get("/products", {
    params: queryParams,
  });
  return response.data;
};

export { createProduct, getProducts };
