import { TCategory, TPoints } from '@/types/game';

export interface IGetGameDataResponse {
  categories: Array<TCategory>;
  point_groups: Array<TPoints>;
}

export interface IRequestError {
  message: string;
  error: string;
}

export interface IMqttPublishQuestionPayload {
  category_title: string;
  points: number;
  question_content: string;
  answer: string;
}
