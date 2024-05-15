import { Question } from '@/components/molecules';
import { TCategory, TPoints, TQuestion } from '@/types/game';
import './Category.style.scss';

interface ICategory {
  category: TCategory;
  pointGroups: Array<TPoints>;
  handleQuestionOpen: (question: TQuestion) => void;
}

export const Category: React.FC<ICategory> = ({
  category,
  pointGroups,
  handleQuestionOpen
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
          categoryTitle={category.title}
          handleQuestionOpen={handleQuestionOpen}
          pointGroups={pointGroups}
        />
      ))}
    </div>
  );
};
