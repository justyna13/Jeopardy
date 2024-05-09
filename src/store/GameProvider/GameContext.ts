import React, { Dispatch } from "react";
import { TTeam } from "@/types/form";
import { TPayloadAction } from "@/store/GameProvider/GameActionTypes.ts";

export interface IGameState {
  teams: Array<TTeam>
}

interface IGameContext {
  state: IGameState,
  dispatch: Dispatch<TPayloadAction>
}

export const GameContext = React.createContext<IGameContext | undefined>(undefined);

export const useGameContext = () => {
  const context: IGameContext | undefined = React.useContext(GameContext);

  if (context === undefined) {
    throw new Error(
      'useGameContext must be used within GameProvider'
    )
  }

  return context;
}
