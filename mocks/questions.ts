import { IGetGameDataResponse } from '../src/types/api';

export const mockResponseData: IGetGameDataResponse = {
  categories: [
    {
      uid: 'first',
      title: 'First cat',
      questions: [
        {
          uid: '123',
          title: 'What is your name?',
          point_group_uid: '100'
        },
        {
          uid: '321',
          title: 'What is your age?',
          point_group_uid: '200'
        }
      ]
    },
    {
      uid: 'second',
      title: 'Second cat',
      questions: [
        {
          uid: '232',
          title: 'Fav cat?',
          point_group_uid: '100'
        },
        {
          uid: '1232',
          title: 'Fav cat age?',
          point_group_uid: '200'
        }
      ]
    },
    {
      uid: 'third',
      title: 'Third cat',
      questions: [
        {
          uid: '2321',
          title: 'Fav cat food?',
          point_group_uid: '100'
        },
        {
          uid: '12321',
          title: 'Fav cat toy?',
          point_group_uid: '200'
        }
      ]
    }
  ],
  point_groups: [
    {
      uid: '100',
      label: '100',
      value: 100
    },
    {
      uid: '200',
      label: '200',
      value: 200
    }
  ]
};
