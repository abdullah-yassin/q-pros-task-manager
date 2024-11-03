import { FC } from 'react';
import Card from 'components/Card/Card';
import { ICategory } from 'interfaces/category';
import FilterBox, { FilterItem } from 'components/FilterBox/FilterBox';

interface SideBarProps {
  categoriesItems: ICategory[];
  isLoadingCategories: boolean;
  selectedStatus: FilterItem;
  selectedCategory: FilterItem;
  setSelectedStatus: (value: FilterItem) => void;
  setSelectedCategory: (value: FilterItem) => void;
}

interface IFilter {
  id: number;
  name: string;
}

const completionFilters: IFilter[] = [
  { id: 1, name: 'Completed' },
  { id: 2, name: 'Incomplete' },
];

const SideBar: FC<SideBarProps> = ({
  categoriesItems,
  isLoadingCategories,
  selectedStatus,
  selectedCategory,
  setSelectedStatus,
  setSelectedCategory,
}) => {
  return (
    <Card className="w-[25%]">
      <h2 className="text-h3 font-semibold mb-4">Filters</h2>

      <FilterBox
        title="Completion Status"
        items={completionFilters}
        selectedFilter={selectedStatus}
        onClickHandler={(item: FilterItem) => setSelectedStatus(item)}
      />

      {isLoadingCategories ? (
        <span>Loading .........</span>
      ) : (
        <FilterBox
          title="Categories"
          items={categoriesItems}
          selectedFilter={selectedCategory}
          onClickHandler={(value: FilterItem) => setSelectedCategory(value)}
        />
      )}
    </Card>
  );
};

export default SideBar;
