import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

import { useGetGameData } from '@/pages/GamePage/hooks/services/useGetGameData.tsx';
import { useMarkQuestionShown } from '@/pages/GamePage/hooks/services/useMarkQuestionShown.tsx';
import { GameActionTypes } from '@/store/GameProvider/GameActionTypes.ts';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { IFormConfig, TTeam } from '@/types/form';
import { TPoints, TQuestion } from '@/types/game';

export const useGamePage = () => {
  const localStorageGameConfig: IFormConfig | undefined =
    JSON.parse(localStorage.getItem('gameConfig')!) ?? undefined;
  const [gameConfig, setGameConfig] = useState<IFormConfig>({
    timer: localStorageGameConfig ? localStorageGameConfig.timer : '',
    backendAddress: localStorageGameConfig
      ? localStorageGameConfig.backendAddress
      : '',
    mqttAddress: localStorageGameConfig
      ? localStorageGameConfig.mqttAddress
      : ''
  });

  const [activeQuestion, setActiveQuestion] = useState<TQuestion | null>();
  const [activePointGroup, setActivePointGroup] = useState<TPoints | null>();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeTeam, setActiveTeam] = useState<TTeam | null>(null);

  const { state, dispatch } = useGameContext();
  const { gameData } = useGetGameData(gameConfig.backendAddress);

  const [questions, setQuestions] = useState<
    Array<TQuestion & { active: boolean }>
  >([]);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);

  const { postQuestionShown } = useMarkQuestionShown(
    gameConfig.backendAddress,
    activeQuestion?.uid ?? ''
  );

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

  // mqtt functions
  const connectToMqtt = (
    mqttOption: mqtt.IClientOptions | undefined = undefined
  ) => {
    setClient(mqtt.connect(gameConfig.mqttAddress, mqttOption));
  };

  const mqttPub = (topic: string, payload: Object) => {
    if (!client) return;
    client.publish(topic, JSON.stringify(payload));
  };

  const mqttSub = (topic: string) => {
    if (!client) return;
    client.subscribe(topic);
  };

  const startMqttConnection = () => {
    connectToMqtt();
  };
  // end mqtt functions

  useEffect(() => {
    if (gameConfig && gameConfig.mqttAddress.length) {
      startMqttConnection();
    }

    if (localStorage.getItem('gameConfig')) {
      const newGameConfig = JSON.parse(
        localStorage.getItem('gameConfig') ?? ''
      );
      setGameConfig(newGameConfig);
    }
  }, [gameData]);

  useEffect(() => {
    if (!client) return;

    client.on('connect', () => {
      mqttSub('quiz/triggered');
    });

    client.on('message', (topic, message) => {
      if (topic === 'quiz/triggered') {
        const msg: { first_btn_num: number } = JSON.parse(message.toString());
        setIsTimerActive(msg.first_btn_num !== -1);

        const team = state.teams.find(
          (team) => String(team.deviceUid) === String(msg.first_btn_num)
        );
        setActiveTeam(team ?? null);

        mqttPub('quiz/selected_team', {
          team: team ?? null
        });
      }
    });
  }, [client]);

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

    mqttPub('quiz/command', {
      command: 'clear',
      args: {
        arm: true
      }
    });

    setActivePointGroup(activePointGroup);
    setActiveQuestion(question);

    postQuestionShown();
  };

  const handleQuestionClose = () => {
    setActiveQuestion(null);
    setActivePointGroup(null);

    mqttPub('quiz/command', {
      command: 'clear',
      args: {
        arm: false
      }
    });
  };

  const handleSkipAnswer = () => {
    // set question as answered
    setQuestions((prevState) => {
      const searchedIndex = prevState.findIndex(
        (question) => question.uid === activeQuestion?.uid
      );
      prevState[searchedIndex].active = false;

      return prevState;
    });

    handleQuestionClose();
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
    gameConfig,
    isTimerActive,
    activeTeam,
    addPointsForTeam,
    removePointsForTeam,
    handleQuestionOpen,
    handleQuestionClose,
    handleSkipAnswer
  };
};
