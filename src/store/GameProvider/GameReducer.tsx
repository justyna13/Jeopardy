import {
  GameAction,
  GameActionTypes
} from '@/store/GameProvider/GameActionTypes.ts';
import { IGameState } from '@/store/GameProvider/GameContext.ts';

export const gameReducer = (state: IGameState, action: GameAction) => {
  switch (action.type) {
    case GameActionTypes.UPDATE_TEAMS:
      return { ...state, teams: action.payload.teams };
    case GameActionTypes.RESET_TEAMS:
      return { ...state, teams: [{ name: '', uid: 'team-1' }] };
    default:
      return { ...state };
  }
};
