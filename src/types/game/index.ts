export type TPoints = {
  uid: string;
  label: string;
  value: number;
};

export type TQuestion = {
  uid: string;
  title: string;
  point_group_uid: string;
};

export type TCategory = {
  uid: string;
  questions: Array<TQuestion>;
  title: string;
};

export type IGameData = {
  categories: Array<TCategory>;
  point_groups: Array<TPoints>;
};
