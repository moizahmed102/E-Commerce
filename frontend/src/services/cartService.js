import axiosInstance from "../interceptors/axiosInstance";

const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

const addToCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/cart/add", {
    productId,
    quantity,
  });
  return response.data;
};

const deleteFromCart = async (productId) => {
  const response = await axiosInstance.delete(`/cart/delete/${productId}`);
  return response.data;
};

export { getCart, addToCart, deleteFromCart };
