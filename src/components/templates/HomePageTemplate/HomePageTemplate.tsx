import React from "react";

interface IHomePageTemplate {
  testid?: string;
}

export const HomePageTemplate: React.FC<IHomePageTemplate> = ({testid}: IHomePageTemplate) => {
  return (
    <div data-testid={testid}>
      home page
    </div>
  )
}
