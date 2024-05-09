import React, { useEffect, useState } from "react";
import { NewGameForm } from "@/components/organisms";
import { useNavigate } from "react-router-dom";
import { Slugs } from "@/constants";

interface IHomePageTemplate {
  testid?: string;
}

export const HomePageTemplate: React.FC<IHomePageTemplate> = ({testid}: IHomePageTemplate) => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      navigate(Slugs.GAME)
    }
  }, [gameStarted])

  return (
    <div data-testid={testid}>
      <NewGameForm handleGameStarted={() => setGameStarted(true)} />
    </div>
  )
}
