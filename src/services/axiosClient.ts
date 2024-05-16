import axios from 'axios';

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error.response.data)
);
