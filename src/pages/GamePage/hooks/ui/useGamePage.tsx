// import { useGetGameData } from "@/pages/GamePage/hooks/services/useGetGameData.tsx";
import { mockResponseData } from '../../../../../mocks/questions.ts';

export const useGamePage = () => {
  // const { gameData } = useGetGameData();
  const gameData = mockResponseData;

  const handleQuestionOpen = (uid: string) => {
    console.log(uid)
  }

  return {
    gameData,
    handleQuestionOpen
  };
};
