import {
  faChevronDown,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import CategoryLabel from 'components/CategoryLabel/CategoryLabel';
import { ICategory } from 'interfaces/category';
import { ICreateTask, IGetTask } from 'interfaces/task';
import { FC, useState } from 'react';
import { updateTask } from 'services/tasks';

interface TaskCardProps {
  task: IGetTask;
  categoriesItems: ICategory[];
  selectedTask: IGetTask;
  setSelectedTask: (task: IGetTask) => void;
  setIsEditLoading: (value: boolean) => void;
  refetchTasks: () => void;
  setIsOpenEditDialog: (value: boolean) => void;
  setIsOpenDeleteDialog: (value: boolean) => void;
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  categoriesItems,
  selectedTask,
  setSelectedTask,
  setIsEditLoading,
  refetchTasks,
  setIsOpenEditDialog,
  setIsOpenDeleteDialog,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  const editTaskMutation = useMutation({
    mutationFn: ({ payload, id }: { payload: ICreateTask; id: string }) =>
      updateTask(payload, id),
    onSuccess: () => {
      setIsEditLoading(false);
      setIsOpenDropDown(false);
      void refetchTasks();
    },
  });

  const editTaskHandler = (taskData: IGetTask, isCompleted: boolean) => {
    setIsEditLoading(true);

    editTaskMutation.mutate({
      id: taskData.id,
      payload: {
        name: taskData.data.name,
        categories: taskData.data.categories,
        description: taskData.data.description ?? '',
        isCompleted: isCompleted,
      },
    });
  };

  return (
    <Card className="flex justify-between w-full mb-4 relative">
      <div>
        <div className="group">
          <h2 className="text-h4 w-fit">{task.data.name}</h2>

          {task.data.description && (
            <Card className="absolute group-hover:block top-16 z-10 !bg-[#0C1049] text-white hidden">
              {task.data.description}
            </Card>
          )}
        </div>
        <div className="mt-2 flex">
          {task.data.categories.map((category, index) => (
            <CategoryLabel
              key={`category-item-${index + 1}`}
              label={
                categoriesItems.find((cat) => cat.id === category)?.name ?? ''
              }
            />
          ))}
        </div>
      </div>

      <div className="flex items-center relative">
        <div>
          <Button
            onClick={() => {
              setSelectedTask(task);
              setIsOpenDropDown((prev) => !prev);
            }}
            className={`px-2 py-1 me-4 rounded-md ${task.data.isCompleted ? 'bg-[#E1FFDE] text-[#0A7900]' : 'bg-[#FFF2DE] text-[#FF6B00]'}`}
          >
            <FontAwesomeIcon icon={faChevronDown} className="me-2" />
            {task.data.isCompleted ? 'Completed' : 'Incomplete'}
          </Button>

          {isOpenDropDown && selectedTask.id === task.id && (
            <Card className="absolute z-10 w-full !p-4">
              <Button
                className="px-2 py-2 w-full rounded-md bg-[#E1FFDE] text-[#0A7900]"
                onClick={() => editTaskHandler(task, true)}
              >
                Mark as completed
              </Button>
              <Button
                className="px-2 py-2 w-full mt-3 rounded-md bg-[#FFF2DE] text-[#FF6B00]"
                onClick={() => editTaskHandler(task, false)}
              >
                Mark as incomplete
              </Button>
            </Card>
          )}
        </div>

        <div>
          <Button
            onClick={() => {
              setSelectedTask(task);
              setIsOpenDeleteDialog(true);
            }}
            className="bg-primary rounded-md px-2 py-1 me-2"
          >
            <FontAwesomeIcon icon={faTrash} color="red" />
          </Button>

          <Button
            onClick={() => {
              setSelectedTask(task);
              setIsOpenEditDialog(true);
            }}
            className="bg-primary rounded-md px-2 py-1"
          >
            <FontAwesomeIcon icon={faPen} color="#3a5bd3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
