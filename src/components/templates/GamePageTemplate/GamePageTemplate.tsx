import { Board } from '@/components/organisms';
import { useGamePage } from '@/pages/GamePage/hooks/ui/useGamePage.tsx';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { TTeam } from '@/types/form';

interface IGamePageTemplate {
  testid?: string;
}

export const GamePageTemplate: React.FC<IGamePageTemplate> = ({
  testid
}: IGamePageTemplate) => {
  const { gameData, handleQuestionOpen } = useGamePage();
  const { state } = useGameContext();

  return (
    <div data-testid={testid} className={'flex gap-2 roboto-regular'}>
      <div className={'w-[85%] bg-[#2a3698]'}>
        <Board testid={'game-page-board'} gameData={gameData} handleQuestionOpen={handleQuestionOpen} />
      </div>

      <div className={'w-[15%] max-h-screen overflow-y-auto'}>
        {state.teams.map((team: TTeam) => (
          <div
            key={team.uid}
            className="text-center text-surface shadow-secondary-1 border-b-2 border-neutral-300 mt-2 pt-2">
            <h5 className="mb-2 text-xl font-medium leading-tight px-6">
              {team.name}
            </h5>
            <div className="">
              <p className="mb-4 text-3xl font-bold">200</p>
            </div>
            <div className="flex items-center justify-center gap-8 my-4">
              <PlusIcon className="size-7 text-white cursor-pointer" />
              <MinusIcon className="size-7 text-white cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
