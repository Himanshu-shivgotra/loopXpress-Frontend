import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://loop-xpress-backend.vercel.app', // Base URL of your backend
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://loopxpress-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
