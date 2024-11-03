import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg px-lg py-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
