import { FC } from 'react';
import RadioButton from 'components/RadioButton/RadioButton';

export type FilterItem = { id: number | string; name: string };

interface IFilterBoxProps {
  title: string;
  items: FilterItem[];
  onClickHandler: (item: FilterItem) => void;
  selectedFilter: FilterItem;
}

const FilterBox: FC<IFilterBoxProps> = ({
  title,
  items,
  onClickHandler,
  selectedFilter,
}) => {
  return (
    <div className="mb-10">
      <p className="mb-2">{title}</p>

      <RadioButton
        id={'all'}
        label={'All'}
        isChecked={'all' === selectedFilter.id}
        onClick={() => onClickHandler({ id: 'all', name: 'All' })}
        className="mb-2"
      />

      {items.map((item) => (
        <RadioButton
          key={item.id}
          id={`${item.id}`}
          label={item.name}
          isChecked={item.id === selectedFilter.id}
          onClick={() => onClickHandler(item)}
          className="mb-2"
        />
      ))}
    </div>
  );
};

export default FilterBox;
