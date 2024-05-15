import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL || ''
});

axiosClient.interceptors.request.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error.response.data)
);
