import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isSubmitting = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      disabled={disabled || isSubmitting}
      className={`
        bg-blue-600 text-white py-2 px-4 rounded-md 
        hover:bg-blue-700 disabled:bg-blue-400
        ${className}
      `}
      {...props}
    >
      {isSubmitting ? 'Loading...' : children}
    </button>
  );
};

export default Button;