import { FC, ReactNode, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import SideBar from 'components/SideBar/SideBar';
import { useGetAllTasksData } from 'helpers/useTasks';
import { useMutation } from '@tanstack/react-query';
import { deleteTask } from 'services/tasks';
import { IGetTask } from 'interfaces/task';
import { useGetAllCategoriesData } from 'helpers/useCategories';
import { ICategory } from 'interfaces/category';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Dialog from 'components/Dialog/Dialog';
import { Circles } from 'react-loader-spinner';
import CreateTaskForm from 'components/CreatTaskForm/CreateTaskForm';
import { FilterItem } from 'components/FilterBox/FilterBox';
import TaskCard from 'components/TaskCard/TaskCard';

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = () => {
  const [tasksItems, setTasksItems] = useState<IGetTask[]>([]);
  const [iseOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<IGetTask>({} as IGetTask);
  const [iseOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [categoriesItems, setCategoriesItems] = useState<ICategory[]>([]);

  // Filters
  const [selectedStatus, setSelectedStatus] = useState<FilterItem>({
    id: 'all',
    name: 'All',
  });
  const [selectedCategory, setSelectedCategory] = useState<FilterItem>({
    id: 'all',
    name: 'All',
  });

  const {
    data: tasksData,
    refetch: refetchTasks,
    isLoading: isLoadingTasks,
  } = useGetAllTasksData();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesData();

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      setIsDeleteLoading(false);
      setIsOpenDeleteDialog(false);
      void refetchTasks();
    },
  });

  useEffect(() => {
    if (tasksData) setTasksItems(tasksData);
  }, [tasksData]);

  useEffect(() => {
    if (categories) setCategoriesItems(categories);
  }, [categories]);

  useEffect(() => {
    const filterTasks = () => {
      if (!tasksData) return;

      const filteredTasks = tasksData.filter((task) => {
        const matchesStatus =
          selectedStatus.name === 'All' ||
          (selectedStatus.name === 'Completed' && task.data.isCompleted) ||
          (selectedStatus.name === 'Incomplete' && !task.data.isCompleted);

        const matchesCategory =
          selectedCategory.id === 'all' ||
          task.data.categories.includes(selectedCategory.id as number);

        return matchesStatus && matchesCategory;
      });

      setTasksItems(filteredTasks);
    };

    filterTasks();
  }, [selectedStatus, selectedCategory, tasksData]);

  if (isLoadingCategories || isLoadingTasks || isEditLoading) {
    return (
      <Loader
        isLoading={isLoadingCategories || isLoadingTasks || isEditLoading}
      />
    );
  }

  return (
    <>
      <div className="max-w-[1320px] m-auto">
        <Header categoriesItems={categoriesItems} refetchTasks={refetchTasks} />

        <div className="flex gap-4">
          <SideBar
            selectedStatus={selectedStatus}
            selectedCategory={selectedCategory}
            categoriesItems={categoriesItems}
            isLoadingCategories={isLoadingCategories}
            setSelectedStatus={setSelectedStatus}
            setSelectedCategory={setSelectedCategory}
          />

          <main className="w-[75%] h-[800px] overflow-y-auto">
            {tasksItems.map((task) => (
              <TaskCard
                key={`task-item-${task.id}`}
                task={task}
                categoriesItems={categoriesItems}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                setIsEditLoading={setIsEditLoading}
                refetchTasks={refetchTasks}
                setIsOpenEditDialog={setIsOpenEditDialog}
                setIsOpenDeleteDialog={setIsOpenDeleteDialog}
              />
            ))}
          </main>
        </div>
      </div>

      <Dialog
        isDialogOpen={iseOpenDeleteDialog}
        setIsDialogOpen={setIsOpenDeleteDialog}
        size="sm"
      >
        <h2 className="mb-4 text-h2">Delete Task!</h2>
        <p>Are you sure you want to delete this task?</p>

        <div className="actions w-full mt-4 flex gap-4">
          <Button
            onClick={() => setIsOpenDeleteDialog(false)}
            className="bg-primary rounded-md basis-1/2 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsDeleteLoading(true);
              deleteMutation.mutate(selectedTask.id);
            }}
            disabled={isDeleteLoading}
            className="flex bg-[#FF3093] text-white rounded-md basis-1/2 py-2 justify-center"
          >
            Delete
            {isDeleteLoading && (
              <div className="ms-2">
                <Circles
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </Button>
        </div>
      </Dialog>

      <Dialog
        isDialogOpen={iseOpenEditDialog}
        setIsDialogOpen={setIsOpenEditDialog}
      >
        <CreateTaskForm
          categoriesItems={categoriesItems}
          setIsDialogOpen={setIsOpenEditDialog}
          refetchTasks={refetchTasks}
          isEdit={true}
          selectedTask={selectedTask}
        />
      </Dialog>
    </>
  );
};

export default MainLayout;
