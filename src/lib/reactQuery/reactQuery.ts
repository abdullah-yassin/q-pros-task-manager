import { AxiosError } from 'axios';
import { QueryClient } from '@tanstack/react-query';

const errorsHandler = (error: AxiosError) => {
  throw new Error('Error: ', error);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => errorsHandler(error as AxiosError),
    },
  },
});
