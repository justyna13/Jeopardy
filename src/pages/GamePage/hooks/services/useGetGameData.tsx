import { useQuery } from '@tanstack/react-query';

import { getGameData } from '@/services/GameService.ts';
import { IGetGameDataResponse, IRequestError } from '@/types/api';

export const useGetGameData = () => {
  const {
    data: gameData,
    error: gameError,
    refetch: refetchGameData
  } = useQuery<IGetGameDataResponse, IRequestError>({
    queryKey: ['game_data'],
    queryFn: getGameData
  });

  return {
    gameData,
    gameError,
    refetchGameData
  };
};
