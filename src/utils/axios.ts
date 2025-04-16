import axios from "axios";
import { logoutHelper } from "../auth/context/auth.helper";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Inject token in requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      setTimeout(() => {
        logoutHelper();
      }, 100);
    }

    return Promise.reject(error.response?.data || "Something went wrong");
  }
);

export default axiosInstance;
