import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
};
