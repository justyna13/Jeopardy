import { IGetGameDataResponse } from "../src/types/api";

export const mockResponseData: IGetGameDataResponse = {
  categories: [
    {
      uid: 'first',
      title: 'First cat',
      questions: [
        {
          uid: '123',
          title: 'What is your name?',
          pointGroupId: '100'
        },
        {
          uid: '321',
          title: 'What is your age?',
          pointGroupId: '200'
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
          pointGroupId: '100'
        },
        {
          uid: '1232',
          title: 'Fav cat age?',
          pointGroupId: '200'
        }
      ]
    }
  ],
  pointGroups: [
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
}
