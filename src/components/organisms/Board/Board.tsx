import React from "react";
import { IGameData } from "@/types/game";
import "./Board.style.scss";

interface IBoard {
  testid?: string;
  gameData: IGameData
}

const Board: React.FC<IBoard> = ({testid, gameData}:IBoard) => {
  console.log(gameData)
  return (
    <div data-testid={testid} className="board">

    </div>
  );
};

export default Board;
