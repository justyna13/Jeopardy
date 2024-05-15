import './Board.style.scss';
import { Category } from '@/components/molecules';
import { IGameData } from '@/types/game';

interface IBoard {
  testid?: string;
  gameData: IGameData;
  handleQuestionOpen: (uid: string) => void;
}

export const Board: React.FC<IBoard> = ({ testid, gameData, handleQuestionOpen }: IBoard) => {
  const { categories, pointGroups } = gameData;

  return (
    <div
      data-testid={testid}
      className="board"
      style={{
        gridTemplateColumns: `repeat(${gameData.categories.length}, 1fr)`
      }}>
      {categories.map((category) => (
        <Category
          key={category.uid}
          handleQuestionOpen={handleQuestionOpen}
          category={category}
          pointGroups={pointGroups}
        />
      ))}
    </div>
  );
};
