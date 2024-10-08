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

const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(
    `/products/${productId}`,
    productData
  );
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/products/${productId}`);
  return response.data;
};

export { createProduct, getProducts, updateProduct, deleteProduct };
