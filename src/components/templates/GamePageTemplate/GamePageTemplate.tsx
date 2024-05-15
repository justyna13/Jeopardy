import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

import { Board } from '@/components/organisms';
import { useGamePage } from '@/pages/GamePage/hooks/ui/useGamePage.tsx';
import { TTeam } from '@/types/form';

interface IGamePageTemplate {
  testid?: string;
}

export const GamePageTemplate: React.FC<IGamePageTemplate> = ({
  testid
}: IGamePageTemplate) => {
  const {
    gameData,
    teams,
    questions,
    handleQuestionOpen,
    handleQuestionClose,
    addPointsForTeam,
    removePointsForTeam
  } = useGamePage();

  const handleCorrectAnswer = (teamUid: string) => {
    addPointsForTeam(teamUid);
  };

  if (!gameData) return null;

  return (
    <div data-testid={testid} className={'flex gap-2 roboto-regular'}>
      <div className={'w-[85%] bg-[#2a3698]'}>
        <Board
          testid={'game-page-board'}
          gameData={gameData}
          questions={questions}
          handleQuestionOpen={handleQuestionOpen}
          handleQuestionClose={handleQuestionClose}
        />
      </div>

      <div className={'w-[15%] max-h-screen overflow-y-auto'}>
        {teams.map((team: TTeam) => (
          <div
            key={team.uid}
            className="text-center text-surface shadow-secondary-1 border-b-2 border-neutral-300 mt-2 pt-2">
            <h5 className="mb-2 text-xl font-medium leading-tight px-6">
              {team.name}
            </h5>
            <div className="">
              <p className="mb-4 text-3xl font-bold">{team.points}</p>
            </div>
            <div className="flex items-center justify-center gap-8 my-4">
              <PlusIcon
                className="size-7 text-white cursor-pointer"
                onClick={() => handleCorrectAnswer(team.uid)}
              />
              <MinusIcon
                className="size-7 text-white cursor-pointer"
                onClick={() => removePointsForTeam(team.uid)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
