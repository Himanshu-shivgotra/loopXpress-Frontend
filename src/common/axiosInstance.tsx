import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://loop-xpress-backend.vercel.app', // Base URL of your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
