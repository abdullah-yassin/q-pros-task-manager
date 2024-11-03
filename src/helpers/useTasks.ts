import { AxiosError } from 'axios';
import { getAllTasks } from 'services/tasks';
import { useQuery } from '@tanstack/react-query';

export const useGetAllTasksData = () => {
  return useQuery({
    queryKey: ['all-tasks'],
    queryFn: async () => {
      try {
        return await getAllTasks();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404)
            throw new Error('Error fetching tasks data');

          throw error as Error;
        }
        throw error;
      }
    },
  });
};
