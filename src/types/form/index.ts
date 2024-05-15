export type TTeam = {
  uid: string;
  name: string;
  points: number;
};

export type IForm = {
  teams: Array<TTeam>;
};
