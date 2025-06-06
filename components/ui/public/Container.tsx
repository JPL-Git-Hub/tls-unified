import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;