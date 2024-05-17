import './Board.style.scss';
import { Category } from '@/components/molecules';
import { TTeam } from '@/types/form';
import { IGameData, TQuestion } from '@/types/game';

interface IBoard {
  testid?: string;
  timer: number;
  gameData: IGameData;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion, categoryTitle: string) => void;
  handleSkipAnswer: () => void;
  handleQuestionClose: () => void;
  isTimerActive: boolean;
  activeTeam: TTeam | null;
}

export const Board: React.FC<IBoard> = ({
  testid,
  gameData,
  questions,
  timer,
  activeTeam,
  isTimerActive,
  handleQuestionOpen,
  handleQuestionClose,
  handleSkipAnswer
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
          activeTeam={activeTeam}
          handleSkipAnswer={handleSkipAnswer}
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
