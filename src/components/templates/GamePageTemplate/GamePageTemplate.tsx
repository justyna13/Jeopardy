import { Board } from '@/components/organisms';
import { useGamePage } from '@/pages/GamePage/hooks/ui/useGamePage.tsx';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { TTeam } from '@/types/form';

interface IGamePageTemplate {
  testid?: string;
}

export const GamePageTemplate: React.FC<IGamePageTemplate> = ({
  testid
}: IGamePageTemplate) => {
  const { gameData } = useGamePage();
  const { state } = useGameContext();

  return (
    <div data-testid={testid} className={'flex gap-2 roboto-regular'}>
      <div className={'w-[85%]'}>
        <Board testid={'game-page-board'} gameData={gameData} />
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
          </div>
        ))}
      </div>
    </div>
  );
};
