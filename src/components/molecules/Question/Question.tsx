import { useEffect, useState } from 'react';

import { Button } from '@/components/atoms';
import { TPoints, TQuestion } from '@/types/game';
import './Question.style.scss';

interface IQuestion {
  data: TQuestion;
  pointGroups: Array<TPoints>;
  categoryTitle: string;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion) => void;
  handleQuestionClose: () => void;
}

export const Question: React.FC<IQuestion> = ({
  data,
  questions,
  pointGroups,
  categoryTitle,
  handleQuestionOpen,
  handleQuestionClose
}: IQuestion) => {
  const [isActive, setIsActive] = useState(true);
  const [open, setOpen] = useState(false);
  const pointGroup = pointGroups.find(
    (group) => group.uid === data.pointGroupId
  );

  useEffect(() => {
    const question = questions.find((question) => question.uid === data.uid);

    setIsActive(!!question?.active);
  }, [questions, handleQuestionOpen, data.uid]);

  const handleClick = () => {
    if (!isActive || open) return;

    setOpen(true);
    handleQuestionOpen(data);
  };

  const handleClose = () => {
    setOpen(false);
    handleQuestionClose();
  };

  return (
    <div
      onClick={handleClick}
      className={
        open
          ? 'jeopardy-question'
          : `jeopardy-question dollar-value ${isActive ? '' : 'disabled'}`
      }>
      {open ? (
        <div className="jeopardy-question-container">
          <div
            className={
              'flex items-center justify-between jeopardy-question-container-cat py-3'
            }>
            <Button
              className="ml-8"
              option="secondary"
              onClick={() => handleClose(false)}>
              ESC
            </Button>
            <p>{categoryTitle}</p>
            <div className="ml-8 w-[60px]"></div>
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
