import { Question } from '@/components/molecules';
import { TCategory, TPoints, TQuestion } from '@/types/game';
import './Category.style.scss';

interface ICategory {
  category: TCategory;
  point_groups: Array<TPoints>;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion) => void;
  handleQuestionClose: () => void;
}

export const Category: React.FC<ICategory> = ({
  category,
  point_groups,
  questions,
  handleQuestionOpen,
  handleQuestionClose
}: ICategory) => {
  return (
    <div className="jeopardy-category">
      <div className="flex justify-center items-center bg-[#2a3698] mb-1.5">
        <h2>{category.title}</h2>
      </div>
      {category.questions.map((question) => (
        <Question
          key={question.uid}
          data={question}
          questions={questions}
          categoryTitle={category.title}
          handleQuestionOpen={handleQuestionOpen}
          handleQuestionClose={handleQuestionClose}
          point_groups={point_groups}
        />
      ))}
    </div>
  );
};
