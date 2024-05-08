import React, { useState } from 'react';
import { TPoints, TQuestion } from "@/types/game";
import "./Question.style.scss";

interface IQuestion {
 data: TQuestion;
 pointGroups: Array<TPoints>
}

export const Question: React.FC<IQuestion> = ({data, pointGroups}: IQuestion) => {
  const [open, setOpen] = useState(false);
  const pointGroup = pointGroups.find(group => group.uid === data.pointGroupId)

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div
      className={open ? 'jeopardy-question' : 'jeopardy-question dollar-value'}
      onClick={handleClick}>
      {open ? <p className="jeopardy-question-container">{data.title}</p> : <p>{pointGroup ? pointGroup.label : ''}</p>}
    </div>
  );
};
