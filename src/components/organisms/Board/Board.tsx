import './Board.style.scss';
import { Category } from '@/components/molecules';
import { IGameData, TQuestion } from '@/types/game';

interface IBoard {
  testid?: string;
  gameData: IGameData;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion) => void;
  handleQuestionClose: () => void;
}

export const Board: React.FC<IBoard> = ({
  testid,
  gameData,
  questions,
  handleQuestionOpen,
  handleQuestionClose
}: IBoard) => {
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
          questions={questions}
          handleQuestionOpen={handleQuestionOpen}
          handleQuestionClose={handleQuestionClose}
          category={category}
          pointGroups={pointGroups}
        />
      ))}
    </div>
  );
};
