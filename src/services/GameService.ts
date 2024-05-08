import { axiosClient } from '@/services/axiosClient.ts';

export const getGameData = async () => {
  return axiosClient
    .get('/test')
    .then((response) => response.data);
};
