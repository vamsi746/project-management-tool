// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-management-tool-wtmq.onrender.com/api', // ✅ updated to include /api
  withCredentials: false, // only needed if using cookies or sessions
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ Automatically attach token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
