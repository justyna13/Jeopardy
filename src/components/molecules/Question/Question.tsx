import { useState } from 'react';

import { TPoints, TQuestion } from '@/types/game';
import './Question.style.scss';

interface IQuestion {
  data: TQuestion;
  pointGroups: Array<TPoints>;
  categoryTitle: string;
}

export const Question: React.FC<IQuestion> = ({
  data,
  pointGroups,
  categoryTitle
}: IQuestion) => {
  const [open, setOpen] = useState(false);
  const pointGroup = pointGroups.find(
    (group) => group.uid === data.pointGroupId
  );

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      className={open ? 'jeopardy-question' : 'jeopardy-question dollar-value'}
      onClick={handleClick}>
      {open ? (
        <div className="jeopardy-question-container">
          <div className={'jeopardy-question-container-cat'}>
            {categoryTitle}
          </div>
          <div
            className={
              'jeopardy-question-container-content text-[8rem] font-bold'
            }>
            {pointGroup ? pointGroup.label : ''}
          </div>
        </div>
      ) : (
        <p>{pointGroup ? pointGroup.label : ''}</p>
      )}
    </div>
  );
};
