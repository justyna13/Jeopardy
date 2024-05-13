import { createContext, Dispatch, useContext } from 'react';

import { TPayloadAction } from '@/store/GameProvider/GameActionTypes.ts';
import { TTeam } from '@/types/form';

export interface IGameState {
  teams: Array<TTeam>;
}

interface IGameContext {
  state: IGameState;
  dispatch: Dispatch<TPayloadAction>;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const useGameContext = () => {
  const context: IGameContext | undefined = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGameContext must be used within GameProvider');
  }

  return context;
};
