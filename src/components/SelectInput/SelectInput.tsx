import { useState, forwardRef } from 'react';
import Button from 'components/Button/Button';

interface SelectInputProps {
  items: { id: number; name: string }[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  label: string;
}

const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>(
  ({ label, items, selectedItems, setSelectedItems }, ref) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const onClickHandler = () => {
      setIsDropdownOpen((prev) => !prev);
    };

    const onClickItemHandler = (item: { id: number; name: string }) => {
      console.log('🚀 ~ onClickItemHandler ~ item:', item);

      setSelectedItems((prev: string[]) => {
        const index = prev.indexOf(item.name);
        return index === -1
          ? [...prev, item.name]
          : prev.filter((i) => i !== item.name);
      });
    };

    return (
      <div ref={ref} className="relative mt-4 w-full">
        <Button
          onClick={onClickHandler}
          className={`${selectedItems.length > 0 ? 'py-2' : 'py-2'} px-2 border border-gray-300 rounded-md w-full text-start`}
        >
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <span
                key={item}
                className="text-gray-400 me-2 border p-1 rounded-md"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{label}</span>
          )}
        </Button>

        {isDropdownOpen && (
          <div className="mt-2">
            {items.map((item) => (
              <Button
                key={item.id}
                onClick={() => onClickItemHandler(item)}
                className="text-gray-400 me-2 border p-1 rounded-md"
              >
                {item.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
