import { FC, useState } from 'react';
import Card from 'components/Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import CreateTaskForm from 'components/CreatTaskForm/CreateTaskForm';
import { ICategory } from 'interfaces/category';

interface IProps {
  categoriesItems: ICategory[];
  refetchTasks: () => void;
}

const Header: FC<IProps> = ({ categoriesItems, refetchTasks }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="flex justify-between items-center mb-4">
        <h1 className="text-h1 font-semibold">Task Manager</h1>

        <Button
          onClick={() => setIsDialogOpen(true)}
          className="group rounded-full bg-blue-600 px-4 py-2 text-white flex items-center justify-center transition-all duration-300 overflow-hidden"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="flex items-center transition-transform duration-300 group-hover:translate-x-10"
          />
          <span className="ms-2 transition-transform duration-400 group-hover:translate-x-[150%]">
            New Task
          </span>
        </Button>
      </Card>

      <Dialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}>
        <CreateTaskForm
          categoriesItems={categoriesItems}
          setIsDialogOpen={setIsDialogOpen}
          refetchTasks={refetchTasks}
        />
      </Dialog>
    </>
  );
};

export default Header;
