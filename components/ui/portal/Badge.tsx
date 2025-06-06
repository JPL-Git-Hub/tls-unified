import React from 'react';

type BadgeColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'blue',
  className = '',
}) => {
  const colorStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colorStyles[color]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;