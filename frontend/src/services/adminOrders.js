import axiosInstance from "../interceptors/axiosInstance";

export const getAllOrders = async () => {
  const response = await axiosInstance.get("/admin/orders");
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.put(`/admin/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await axiosInstance.delete(`/admin/orders/${orderId}`);
  return response.data;
};
