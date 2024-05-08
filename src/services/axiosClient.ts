import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_API_URL || ''
})

axiosClient.interceptors.request.use(
  (response) => Promise.resolve(response),
  (error) => Promise.reject(error.response.data)
)
