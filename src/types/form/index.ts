export type TTeam = {
  uid: string;
  name: string;
  points: number;
  deviceUid: string;
};

export type IForm = {
  teams: Array<TTeam>;
  timer: string;
  mqttAddress: string;
  backendAddress: string;
};

export type IFormConfig = {
  timer: string;
  mqttAddress: string;
  backendAddress: string;
};

export interface IOption {
  label: string;
  value: string;
}
