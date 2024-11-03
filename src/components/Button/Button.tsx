import { FC, ReactNode } from 'react';

interface ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (value?: any) => void;
  children: ReactNode | string;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      className={`h-fit w-fit ${className ? className : ''}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
