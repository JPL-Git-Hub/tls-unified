import React from 'react';

export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as FormInput } from './FormInput';
export { default as Badge } from './Badge';

// Create ErrorMessage component if it doesn't exist
export const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-red-600 text-sm mt-1">{children}</div>
);

