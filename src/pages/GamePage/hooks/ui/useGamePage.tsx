import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

import { useGetGameData } from '@/pages/GamePage/hooks/services/useGetGameData.tsx';
import { GameActionTypes } from '@/store/GameProvider/GameActionTypes.ts';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { IMqttPublishQuestionPayload } from '@/types/api';
import { TPoints, TQuestion } from '@/types/game';

export const useGamePage = () => {
  const [activeQuestion, setActiveQuestion] = useState<TQuestion | null>();
  const [activePointGroup, setActivePointGroup] = useState<TPoints | null>();
  const { state, dispatch } = useGameContext();
  const { gameData } = useGetGameData();
  // const gameData = mockResponseData;
  const [questions, setQuestions] = useState<
    Array<TQuestion & { active: boolean }>
  >([]);

  // mqtt
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  const connectToMqtt = (
    host: string,
    mqttOption: mqtt.IClientOptions | undefined = undefined
  ) => {
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttPub = (topic: string, payload: IMqttPublishQuestionPayload) => {
    if (!client) return;

    client.publish(topic, JSON.stringify(payload));
  };

  const startMqttConnection = () => {
    connectToMqtt(import.meta.env.VITE_MQTT_SERVER_HOST);
  };
  // end mqtt

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
    if (!gameData) return;

    const activePointGroup = gameData.point_groups.find(
      (group) => group.uid === question.point_group_uid
    );

    mqttPub('quiz/selected_question', {
      category_title: activePointGroup?.label ?? '',
      question_content: question.content,
      points: activePointGroup?.value ?? 0,
      answer: question.answer
    });

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
    startMqttConnection,
    handleQuestionOpen,
    addPointsForTeam,
    removePointsForTeam,
    handleQuestionClose
  };
};
