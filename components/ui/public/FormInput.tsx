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
          w-full px-4 py-3 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
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

export default FormInput;