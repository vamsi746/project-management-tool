// src/utils/axiosInstance.js
import axiosInstance from '../utils/axiosInstance';


const axiosInstance = axios.create({
  baseURL: 'https://project-management-tool-wtmq.onrender.com',
  withCredentials: true, // if using cookies
});

// Automatically attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
