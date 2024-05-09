import { TTeam } from "@/types/form";

export enum GameActionTypes {
  UPDATE_TEAMS = 'UPDATE_TEAMS'
}

export type TPayloadAction =
  | {
    type: GameActionTypes.UPDATE_TEAMS,
    payload: Array<TTeam>
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;

export type GameAction = TPayloadAction;
