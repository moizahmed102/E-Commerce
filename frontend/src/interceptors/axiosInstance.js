import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        window.location.href = "/login";
      }

      const errorMessage = error.response.data?.message || "An error occurred";
      return Promise.reject({ message: errorMessage });
    }
    return Promise.reject({ message: "Network error. Please try again." });
  }
);

export default axiosInstance;
