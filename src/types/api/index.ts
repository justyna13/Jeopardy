import { TCategory, TPoints } from '@/types/game';

export interface IGetGameDataResponse {
  categories: Array<TCategory>;
  pointGroups: Array<TPoints>;
}

export interface IRequestError {
  message: string;
  error: string;
}
