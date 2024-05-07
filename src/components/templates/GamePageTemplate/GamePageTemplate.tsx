import React from "react";

interface IGamePageTemplate {
  testid?: string;
}

export const GamePageTemplate: React.FC<IGamePageTemplate> = ({testid}: IGamePageTemplate) => {
  return (
    <div data-testid={testid}>
      game page
    </div>
  )
}
