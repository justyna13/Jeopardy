import { useMutation } from '@tanstack/react-query';

import { markQuestionAsShown } from '@/services/GameService.ts';

export const useMarkQuestionShown = (
  backendUrl: string,
  questionUid: string
) => {
  const { mutate: postQuestionShown, error } = useMutation({
    mutationFn: () => markQuestionAsShown(backendUrl, questionUid)
  });

  return { postQuestionShown, error };
};
