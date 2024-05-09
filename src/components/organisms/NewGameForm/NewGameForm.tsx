import { FormProvider, useForm } from "react-hook-form";
import { IForm } from "@/types/form";
import { Button } from "@/components/atoms";
import { FormInput } from "@/components/molecules/FormInput/FormInput.tsx";
import { useGameContext } from "@/store/GameProvider/GameContext.ts";
import { GameActionTypes } from "@/store/GameProvider/GameActionTypes.ts";

interface INewGameForm {
  handleGameStarted: () => void;
}

export const NewGameForm: React.FC<INewGameForm> = ({handleGameStarted}: INewGameForm) => {
  const methods = useForm<IForm>({ mode: 'onChange' });
  const { state, dispatch} = useGameContext();

  const addNewTeam = () => {
    const updatedTeams = [state.teams, {name: '', uid: `team-${state.teams.length + 1}`}];

    dispatch({ type: GameActionTypes.UPDATE_TEAMS, payload: { teams: updatedTeams } });
  }

  const removeTeam = (selectedUid: string) => {
    const updatedTeams = state.teams.filter(team => team.uid === selectedUid)

    dispatch({ type: GameActionTypes.UPDATE_TEAMS, payload: { teams: updatedTeams }})
  }

  const saveTeams = () => {
    const isFormInvalid = Object.keys(methods.formState.errors).length > 0;
    if (isFormInvalid) return;
  }

  return (
    <div className="form-wrapper">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(saveTeams)}
          noValidate>
          {
            state.teams.map(team => (
              <div key={`team-${team.uid}`}>
                <div>
                  <FormInput
                    id={`${team.uid}-name`}
                    label="Nazwa grupy"
                    name={`team.name`}
                    type="text"
                    validationSchema={{required: 'Pole wymagane'}}
                    placeholder="" />

                  <Button testid={'remove-team'} onClick={() => removeTeam(team.uid)}>Usuń</Button>
                </div>
                <Button testid={'add-new-team'} onClick={() => addNewTeam()}>Dodaj kolejną</Button>
              </div>
            ))
          }

          <Button testid={'new-game-btn'} onClick={handleGameStarted}>
            Rozpocznij
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
