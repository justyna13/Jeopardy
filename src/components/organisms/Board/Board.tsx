import React from "react";
import { IGameData } from "@/types/game";
import "./Board.style.scss";
import { Category } from "@/components/molecules";

interface IBoard {
  testid?: string;
  gameData: IGameData
}

export const Board: React.FC<IBoard> = ({testid, gameData}:IBoard) => {
  const { categories, pointGroups} = gameData;

  return (
    <div
      data-testid={testid}
      className="board"
      style={{gridTemplateColumns: `repeat(${gameData.categories.length}, 1fr)`}}>
      {
        categories.map((category) => (
          <Category key={category.uid} category={category} pointGroups={pointGroups} />
        ))
      }
    </div>
  );
};