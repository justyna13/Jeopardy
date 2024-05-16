import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { FormInput } from '@/components/molecules/FormInput/FormInput.tsx';
import { GameActionTypes } from '@/store/GameProvider/GameActionTypes.ts';
import { useGameContext } from '@/store/GameProvider/GameContext.ts';
import { IForm, TTeam } from '@/types/form';

interface INewGameForm {
  handleGameStarted: () => void;
}

export const NewGameForm: React.FC<INewGameForm> = ({
  handleGameStarted
}: INewGameForm) => {
  const [nextUid, setNextUid] = useState(2);
  const methods = useForm<IForm>({ mode: 'onSubmit' });
  const { state, dispatch } = useGameContext();
  const teamsLimit = 8;

  const addNewTeam = () => {
    if (state.teams.length >= teamsLimit) return;

    const updatedTeams: Array<TTeam> = [
      ...state.teams,
      { name: '', uid: `team-${nextUid}`, points: 0 }
    ];

    dispatch({
      type: GameActionTypes.UPDATE_TEAMS,
      payload: { teams: updatedTeams }
    });

    setNextUid(nextUid + 1);
  };

  const removeTeam = (selectedUid: string) => {
    const updatedTeams = state.teams.filter((team) => team.uid !== selectedUid);

    dispatch({
      type: GameActionTypes.UPDATE_TEAMS,
      payload: { teams: updatedTeams }
    });
  };

  const saveTeams = () => {
    const isFormInvalid = Object.keys(methods.formState.errors).length > 0;
    if (isFormInvalid) return;

    const updatedTeams: Array<TTeam> = [];
    const form = methods.getValues();
    state.teams.map((team) => {
      const fieldName = `${team.uid}name`;
      // @ts-expect-error todo
      const fieldValue = form[fieldName];

      updatedTeams.push({
        name: fieldValue,
        uid: team.uid,
        points: team.points
      });
    });

    dispatch({
      type: GameActionTypes.UPDATE_TEAMS,
      payload: { teams: updatedTeams }
    });

    handleGameStarted();
  };

  return (
    <div className="form-wrapper">
      <FormProvider {...methods}>
        <form
          className="px-0 pt-6 mb-4 text-[#333]"
          onSubmit={methods.handleSubmit(saveTeams)}
          noValidate>
          {state.teams.map((team) => (
            <div key={`team-${team.uid}`}>
              <div className={'flex items-end justify-between'}>
                <div className={'w-1/2'}>
                  <FormInput
                    id={`${team.uid}-name`}
                    label={`Nazwa grupy`}
                    name={`${team.uid}name`}
                    type="text"
                    validationSchema={{ required: 'Pole wymagane' }}
                    placeholder=""
                  />
                </div>
                {state.teams.length > 1 && (
                  <Button
                    testid={'remove-team'}
                    className={
                      'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 form-control'
                    }
                    onClick={() => removeTeam(team.uid)}>
                    Usuń
                  </Button>
                )}
              </div>
            </div>
          ))}
          {state.teams.length < teamsLimit && (
            <Button
              className={'text-[#333]'}
              testid={'add-new-team'}
              option="primary"
              type="button"
              onClick={() => addNewTeam()}>
              Dodaj grupę
            </Button>
          )}

          <div className={'mt-4 flex justify-end'}>
            <Button
              className={
                'text-white bg-green-600  focus:outline-none hover:bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
              }
              testid={'new-game-btn'}
              type="submit">
              Rozpocznij
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
