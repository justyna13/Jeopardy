import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/atoms';
import { Modal } from '@/components/molecules';
import { NewGameForm } from '@/components/organisms';
import { Slugs } from '@/constants';
import { GameActionTypes } from '@/store/GameProvider/GameActionTypes.ts';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';

interface IHomePageTemplate {}

export const HomePageTemplate: React.FC<IHomePageTemplate> = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { dispatch } = useGameContext();

  useEffect(() => {
    if (gameStarted) {
      navigate(Slugs.GAME);
    }
  }, [gameStarted, navigate]);

  const onClickCloseModal = () => {
    setModalOpen(false);
    dispatch({
      type: GameActionTypes.RESET_TEAMS
    });
  };

  return (
    <div className="roboto-regular">
      {modalOpen ? (
        <Modal
          headerElem={<NewGameModalHeader />}
          onClickCloseModal={onClickCloseModal}>
          <NewGameForm handleGameStarted={() => setGameStarted(true)} />
        </Modal>
      ) : (
        <div className="flex justify-center items-center h-screen w-screen">
          <Button
            className={'bg-blue-500 hover:bg-blue-700 h-16 w-[320px]'}
            onClick={() => setModalOpen(true)}>
            Nowa gra
          </Button>
        </div>
      )}
    </div>
  );
};

const NewGameModalHeader = () => {
  return (
    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl">
      Nowa gra
    </h2>
  );
};
