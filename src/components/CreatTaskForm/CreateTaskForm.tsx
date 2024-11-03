import { useMutation } from '@tanstack/react-query';
import Loader from 'components/Loader/Loader';
import SelectInput from 'components/SelectInput/SelectInput';
import { ICategory } from 'interfaces/category';
import { ICreateTask, IGetTask } from 'interfaces/task';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, updateTask } from 'services/tasks';

interface ICreateForm {
  taskName: string;
  taskDescription?: string;
  isCompleted?: boolean;
  categories: string[];
}

interface IProps {
  categoriesItems: ICategory[];
  setIsDialogOpen: (value: boolean) => void;
  refetchTasks: () => void;
  isEdit?: boolean;
  selectedTask?: IGetTask;
}

const CreateTaskForm: FC<IProps> = ({
  categoriesItems,
  setIsDialogOpen,
  refetchTasks,
  isEdit = false,
  selectedTask,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<ICreateForm>();

  const createTaskMutation = useMutation({
    mutationFn: (payload: ICreateTask) => createTask(payload),
    onSuccess: () => {
      setIsLoading(false);
      setIsDialogOpen(false);
      void refetchTasks();
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: ({ payload, id }: { payload: ICreateTask; id: string }) =>
      updateTask(payload, id),
    onSuccess: () => {
      setIsLoading(false);
      setIsDialogOpen(false);
      void refetchTasks();
    },
  });

  const onSubmit = (data: ICreateForm) => {
    setIsLoading(true);

    if (isEdit && selectedTask) {
      data.isCompleted = selectedTask?.data.isCompleted || false;

      const task = {
        name: data.taskName,
        description: data.taskDescription || '',
        isCompleted: data.isCompleted,
        categories: categoriesItems
          .filter((item) => data.categories.includes(item.name))
          .map((item) => item.id),
      };

      editTaskMutation.mutate({ payload: task, id: selectedTask.id });
    } else {
      const task = {
        name: data.taskName, // Map taskName to name
        description: data.taskDescription || '', // Default to an empty string if undefined
        isCompleted: false, // Default value for isCompleted
        categories: categoriesItems
          .filter((item) => data.categories.includes(item.name))
          .map((item) => item.id),
      };

      createTaskMutation.mutate(task);
    }
  };

  const getCategoriesNamesFromIds = (categoriesIds: number[]): string[] => {
    return categoriesItems
      .filter((category) => categoriesIds.includes(category.id))
      .map((category) => category.name);
  };

  useEffect(() => {
    // Update form value and clear error if selected categories are not empty
    if (selectedCategories.length > 0) {
      setValue('categories', selectedCategories);
      clearErrors('categories'); // Clear the error if categories are selected
    } else {
      setValue('categories', []); // Reset categories if none are selected
    }
  }, [selectedCategories, setValue, clearErrors]);

  useEffect(() => {
    if (isEdit) {
      setSelectedCategories(
        getCategoriesNamesFromIds(selectedTask?.data.categories ?? [])
      );
    }
  }, [isEdit]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
      <h2 className="text-h2 mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <div className="flex flex-col mb-4">
          <input
            {...register('taskName', { required: true })}
            className="p-2 border rounded-md"
            placeholder="Task Name (required)"
            defaultValue={isEdit ? selectedTask?.data.name : ''}
          />
          {/* errors will return when field validation fails  */}
          {errors.taskName && (
            <span className="text-red-600 mt-1">This field is required</span>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            {...register('taskDescription', { required: false })}
            className="p-2 border rounded-md"
            placeholder="Task description (optional)"
            rows={8}
          />
        </div>

        <SelectInput
          {...register('categories', { required: true })}
          label="Categories"
          items={categoriesItems}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
        />

        {errors.categories && (
          <span className="text-red-600 mt-1">This field is required</span>
        )}

        <div className="actions flex w-full mt-8 gap-4">
          <button
            type="button"
            className="bg-primary rounded-md basis-1/2 py-2"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#395BD3] rounded-md basis-1/2 py-2 text-white"
          >
            {isEdit ? 'Edit' : 'Create'}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateTaskForm;
