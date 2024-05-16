import './Board.style.scss';
import { Category } from '@/components/molecules';
import { IGameData, TQuestion } from '@/types/game';

interface IBoard {
  testid?: string;
  timer: number;
  gameData: IGameData;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion) => void;
  handleQuestionClose: () => void;
  isTimerActive: boolean;
}

export const Board: React.FC<IBoard> = ({
  testid,
  gameData,
  questions,
  timer,
  isTimerActive,
  handleQuestionOpen,
  handleQuestionClose
}: IBoard) => {
  const { categories, point_groups } = gameData;

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
          timer={timer}
          handleQuestionOpen={handleQuestionOpen}
          handleQuestionClose={handleQuestionClose}
          category={category}
          isTimerActive={isTimerActive}
          point_groups={point_groups}
        />
      ))}
    </div>
  );
};
