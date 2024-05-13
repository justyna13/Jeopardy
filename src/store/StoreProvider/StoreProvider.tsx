import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/services/queryClient.ts';

interface IStoreProvider {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<IStoreProvider> = ({
  children
}: IStoreProvider) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
