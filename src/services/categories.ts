import { ICategory } from 'interfaces/category';
import axiosInstance from 'lib/axios/axiosConfig';

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories.json');
    const categories = response.data
      ? Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }))
      : [];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
