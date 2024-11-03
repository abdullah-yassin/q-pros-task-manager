import { FC, MouseEvent } from 'react';

interface IRadioButtonProps {
  id: string;
  icon?: string;
  label?: string;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const RadioButton: FC<IRadioButtonProps> = ({
  id,
  icon,
  label,
  onClick,
  className = '',
  isChecked = false,
  isDisabled = false,
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (isDisabled) return;

    if (onClick) onClick();
  };

  return (
    <div
      className={`group flex items-center ${className}`}
      onClick={handleClick}
    >
      <div
        id={id}
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 outline outline-4 outline-white transition-all duration-300 ${
          isDisabled
            ? 'cursor-not-allowed border'
            : 'cursor-pointer border focus:outline-none group-hover:border-primary group-hover:outline-gray-300'
        } ${isChecked ? 'border-primary' : ''}`}
      >
        <div
          className={`h-3 w-3 rounded-full bg-blue-600 transition-transform duration-300 ${
            isChecked ? 'flex scale-150 items-center justify-center' : 'scale-0'
          }`}
        >
          {isChecked && (
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          )}
        </div>
      </div>

      {label && !icon && (
        <label
          htmlFor={id}
          className={`ml-2 transition-all duration-300 ${
            isDisabled ? 'cursor-not-allowed text-secondary' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      )}

      {icon && (
        <div
          className={`ml-2 transition-all duration-300 ${
            isDisabled
              ? 'cursor-not-allowed text-secondary'
              : 'cursor-pointer text-primary hover:text-primary'
          }`}
        >
          <img src={icon} alt="radio" />
        </div>
      )}
    </div>
  );
};

export default RadioButton;
