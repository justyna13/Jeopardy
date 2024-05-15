import { Question } from '@/components/molecules';
import { TCategory, TPoints } from '@/types/game';
import './Category.style.scss';

interface ICategory {
  category: TCategory;
  pointGroups: Array<TPoints>;
}

export const Category: React.FC<ICategory> = ({
  category,
  pointGroups
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
          pointGroups={pointGroups}
        />
      ))}
    </div>
  );
};
