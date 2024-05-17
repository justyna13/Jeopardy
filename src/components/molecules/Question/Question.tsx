import { useEffect, useState } from 'react';

import { Button } from '@/components/atoms';
import { CountdownTimer } from '@/components/molecules';
import { TTeam } from '@/types/form';
import { TPoints, TQuestion } from '@/types/game';
import './Question.style.scss';

interface IQuestion {
  data: TQuestion;
  point_groups: Array<TPoints>;
  categoryTitle: string;
  questions: Array<TQuestion & { active: boolean }>;
  handleQuestionOpen: (question: TQuestion, categoryTitle: string) => void;
  handleQuestionClose: () => void;
  handleSkipAnswer: () => void;
  timer: number;
  isTimerActive: boolean;
  activeTeam: TTeam | null;
}

export const Question: React.FC<IQuestion> = ({
  data,
  questions,
  point_groups,
  categoryTitle,
  timer,
  isTimerActive,
  activeTeam,
  handleQuestionOpen,
  handleQuestionClose,
  handleSkipAnswer
}: IQuestion) => {
  const [isActive, setIsActive] = useState(true);
  const [open, setOpen] = useState(false);
  const pointGroup = point_groups.find(
    (group) => group.uid === data.point_group_uid
  );

  useEffect(() => {
    const question = questions.find((question) => question.uid === data.uid);

    setIsActive(!!question?.active);
  }, [questions, handleQuestionOpen, data.uid]);

  const handleClick = () => {
    if (!isActive || open) return;

    setOpen(true);
    handleQuestionOpen(data, categoryTitle);
  };

  const handleClose = () => {
    setOpen(false);
    handleQuestionClose();
  };

  const handleClickSkip = () => {
    setOpen(false);
    handleSkipAnswer();
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
              onClick={() => handleClose()}>
              ESC
            </Button>
            <p>
              {categoryTitle} - <b>{pointGroup ? pointGroup.label : ''}</b>
            </p>
            <Button
              className="mr-8"
              option="secondary"
              onClick={handleClickSkip}>
              Pomiń odp
            </Button>
          </div>
          <div
            className={
              'jeopardy-question-container-content text-[4rem] font-bold mx-4 flex flex-col gap-14'
            }>
            {isTimerActive}
            <CountdownTimer duration={timer} isPlaying={isTimerActive} />
            <div className={'h-3'}>{activeTeam ? activeTeam.name : ''}</div>
          </div>
          <div className="absolute left-2 bottom-2 text-xs">{data.uid}</div>
        </div>
      ) : (
        <p>{pointGroup ? pointGroup.label : ''}</p>
      )}
    </div>
  );
};
