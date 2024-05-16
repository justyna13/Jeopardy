import { Question } from '@/components/molecules';
import { TTeam } from '@/types/form';
import { TCategory, TPoints, TQuestion } from '@/types/game';
import './Category.style.scss';

interface ICategory {
  category: TCategory;
  point_groups: Array<TPoints>;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion) => void;
  handleSkipAnswer: () => void;
  handleQuestionClose: () => void;
  timer: number;
  isTimerActive: boolean;
  activeTeam: TTeam | null;
}

export const Category: React.FC<ICategory> = ({
  category,
  point_groups,
  questions,
  timer,
  activeTeam,
  isTimerActive,
  handleQuestionOpen,
  handleSkipAnswer,
  handleQuestionClose
}: ICategory) => {
  return (
    <div className="jeopardy-category">
      <div className="flex justify-center items-center bg-[#2a3698] mb-1.5 h-[70px]">
        <h2>{category.title}</h2>
      </div>
      {category.questions.map((question) => (
        <Question
          key={question.uid}
          data={question}
          questions={questions}
          timer={timer}
          activeTeam={activeTeam}
          categoryTitle={category.title}
          isTimerActive={isTimerActive}
          handleQuestionOpen={handleQuestionOpen}
          handleSkipAnswer={handleSkipAnswer}
          handleQuestionClose={handleQuestionClose}
          point_groups={point_groups}
        />
      ))}
    </div>
  );
};
