export type TTeam = {
  uid: string;
  name: string;
  points: number;
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
