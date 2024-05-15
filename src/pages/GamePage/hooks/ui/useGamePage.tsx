import { useEffect, useState } from 'react';

import { mockResponseData } from '../../../../../mocks/questions.ts';

import { GameActionTypes } from '@/store/GameProvider/GameActionTypes.ts';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { TPoints, TQuestion } from '@/types/game';

export const useGamePage = () => {
  const [activeQuestion, setActiveQuestion] = useState<TQuestion | null>();
  const [activePointGroup, setActivePointGroup] = useState<TPoints | null>();
  const { state, dispatch } = useGameContext();
  // const { gameData } = useGetGameData();
  const gameData = mockResponseData;
  const [questions, setQuestions] = useState<
    Array<TQuestion & { active: boolean }>
  >([]);

  useEffect(() => {
    if (gameData) {
      const allQuestions: Array<TQuestion & { active: boolean }> = [];
      gameData.categories.map((category) => {
        category.questions.map((question) => {
          allQuestions.push({
            ...question,
            active: true
          });
        });
      });

      setQuestions(allQuestions);
    }
  }, [gameData]);

  const handleQuestionOpen = (question: TQuestion) => {
    const activePointGroup = gameData.pointGroups.find(
      (group) => group.uid === question.pointGroupId
    );

    setActivePointGroup(activePointGroup);
    setActiveQuestion(question);
  };

  const handleQuestionClose = () => {
    setActiveQuestion(null);
    setActivePointGroup(null);
  };

  const addPointsForTeam = (teamUid: string) => {
    if (!activePointGroup) return;

    const updatedTeams = state.teams;
    const updatedTeamIndex = updatedTeams.findIndex(
      (team) => team.uid === teamUid
    );

    if (updatedTeamIndex === -1) return;

    updatedTeams[updatedTeamIndex].points =
      updatedTeams[updatedTeamIndex].points + activePointGroup.value;

    dispatch({
      type: GameActionTypes.UPDATE_TEAMS,
      payload: { teams: updatedTeams }
    });

    // set question as answered
    setQuestions((prevState) => {
      const searchedIndex = prevState.findIndex(
        (question) => question.uid === activeQuestion?.uid
      );
      prevState[searchedIndex].active = false;

      return prevState;
    });
  };

  const removePointsForTeam = (teamUid: string) => {
    if (!activePointGroup) return;

    const updatedTeams = state.teams;
    const updatedTeamIndex = updatedTeams.findIndex(
      (team) => team.uid === teamUid
    );

    if (updatedTeamIndex === -1) return;

    updatedTeams[updatedTeamIndex].points =
      updatedTeams[updatedTeamIndex].points - activePointGroup?.value;

    dispatch({
      type: GameActionTypes.UPDATE_TEAMS,
      payload: { teams: updatedTeams }
    });
  };

  return {
    teams: state.teams,
    gameData,
    questions,
    handleQuestionOpen,
    addPointsForTeam,
    removePointsForTeam,
    handleQuestionClose
  };
};
