import { axiosClient } from '@/services/axiosClient.ts';

export const getGameData = async (backendUrl: string) => {
  return axiosClient
    .get(`${backendUrl}/api/quiz/`)
    .then((response) => response.data);
};

export const markQuestionAsShown = async (
  backendUrl: string,
  questionUid: string
) => {
  return axiosClient
    .post(`${backendUrl}/api/question/shown/${questionUid}`)
    .then((response) => response.data);
};
