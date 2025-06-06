import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className = '',
}) => {
  if (!children) return null;
  
  return (
    <div className={`p-3 bg-red-50 text-red-700 text-sm rounded text-left mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default ErrorMessage;