import { ICreateTask } from 'interfaces/task';
import axiosInstance from 'lib/axios/axiosConfig';

export const createTask = async (task: ICreateTask) => {
  try {
    const response = await axiosInstance.post('/tasks.json', task);
    console.log('Task added:', response.data);
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks.json');
    const tasks = response.data
      ? Object.keys(response.data).map((key) => ({
          id: key,
          data: response.data[key],
        }))
      : [];

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const updateTask = async (updatedTask: ICreateTask, id: string) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}.json`, updatedTask);
    console.log('Task updated:', response.data);
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}.json`);
    console.log('Task deleted');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
