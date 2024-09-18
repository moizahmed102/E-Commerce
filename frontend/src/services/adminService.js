import axiosInstance from "../interceptors/axiosInstance";

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/admin/create", productData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create product"
    );
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(
      `/admin/update/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update product"
    );
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};

export const getProducts = async (filters) => {
  try {
    const response = await axiosInstance.get("/admin/products", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch products");
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/admin/orders");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders", error); // Improved logging
    throw new Error(error.message || "Failed to fetch orders");
  }
};
