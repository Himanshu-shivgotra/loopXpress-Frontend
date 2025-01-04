import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://loop-xpress-backend.vercel.app', // Base URL of your backend
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
