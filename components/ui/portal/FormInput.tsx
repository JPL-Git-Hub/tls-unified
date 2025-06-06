import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md
          ${className}
        `}
        {...props}
      />
      {error && (
        <div className="mt-1 text-sm text-red-600">{error}</div>
      )}
    </div>
  );
};

export const ErrorMessage: React.FC<{children: React.ReactNode}> = ({ children }) => {
  if (!children) return null;
  
  return (
    <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded">
      {children}
    </div>
  );
};

export default FormInput;