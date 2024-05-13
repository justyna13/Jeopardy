import { Board } from '@/components/organisms';
import { useGamePage } from '@/pages/GamePage/hooks/ui/useGamePage.tsx';

interface IGamePageTemplate {
  testid?: string;
}

export const GamePageTemplate: React.FC<IGamePageTemplate> = ({
  testid
}: IGamePageTemplate) => {
  const { gameData } = useGamePage();

  return (
    <div data-testid={testid}>
      <Board testid={'game-page-board'} gameData={gameData} />
    </div>
  );
};
