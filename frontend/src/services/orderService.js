import axiosInstance from "../interceptors/axiosInstance";

const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/order/checkout", orderData);
  return response.data;
};

const fetchOrders = async (userId) => {
  const response = await axiosInstance.get(`/order/all?userId=${userId}`);
  return response.data;
};

export { createOrder, fetchOrders };
