import { useQuery } from "@tanstack/react-query";
import { IGetGameDataResponse, IRequestError } from "@/types/game";
import { getGameData } from "@/services/GameService.ts";

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
  }
}
