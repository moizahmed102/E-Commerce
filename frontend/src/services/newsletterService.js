import axiosInstance from "../interceptors/axiosInstance";

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axiosInstance.post("/newsletter/subscribe", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong. Please try again.";
  }
};
