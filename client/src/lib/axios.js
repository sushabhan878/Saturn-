import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL / api,
  withCredentials: true,
});

export default axiosInstance;
