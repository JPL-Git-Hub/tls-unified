import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const EmptyState: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;