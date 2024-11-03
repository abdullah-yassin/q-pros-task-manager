import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from 'services/categories';

export const useGetAllCategoriesData = () => {
  return useQuery({
    queryKey: ['all-categories'],
    queryFn: async () => {
      try {
        return await getAllCategories();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 404)
            throw new Error('Error fetching categories data');

          throw error as Error;
        }
        throw error;
      }
    },
  });
};
