import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = false,
  isSubmitting = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      disabled={disabled || isSubmitting}
      className={`
        bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
        text-white font-semibold py-3 px-8 rounded-lg transition-colors
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isSubmitting ? 'Loading...' : children}
    </button>
  );
};

export default Button;