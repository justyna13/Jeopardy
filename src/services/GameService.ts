import { axiosClient } from '@/services/axiosClient.ts';

export const getGameData = async () => {
  return axiosClient.get('api/quiz/').then((response) => response.data);
};
