import { FC } from 'react';

interface CategoryLabelProps {
  label: string;
}

const CategoryLabel: FC<CategoryLabelProps> = ({ label }) => {
  return (
    <span className="block me-2 p-1 rounded-full text-[#3a5bd3] border border-[#3a5bd3] bg-[#f6f6ff] text-[12px]">
      {label}
    </span>
  );
};

export default CategoryLabel;
