// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-management-tool-wtmq.onrender.com',
  withCredentials: true, // optional: for cookies/session if used
  headers: {
    'Content-Type': 'application/json',
  }
});

// Automatically attach token if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
