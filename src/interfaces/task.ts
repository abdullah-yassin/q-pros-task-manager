export interface IGetTask {
  id: string;
  data: {
    name: string;
    isCompleted: boolean;
    categories: number[];
    description?: string;
  };
}

export interface ICreateTask {
  name: string;
  isCompleted: boolean;
  categories: number[];
  description?: string;
}
