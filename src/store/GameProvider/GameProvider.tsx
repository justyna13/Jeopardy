import React from "react";
import { GameContext, IGameState } from "@/store/GameProvider/GameContext.ts";
import { gameReducer } from "@/store/GameProvider/GameReducer.tsx";

interface IGameProvider {
  children: React.ReactNode;
}

const initialState: IGameState = {
  teams: [{name: '', uid: 'team-1'}]
}

export const GameProvider: React.FC<IGameProvider> = ({
  children
}: IGameProvider) => {
  const [state, dispatch] = React.useReducer(
    gameReducer,
    initialState
  );

  const value = {
    state,
    dispatch
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
