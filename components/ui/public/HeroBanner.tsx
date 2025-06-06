import React from 'react';

interface HeroBannerProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-white ${className}`}>
      <div className="text-center max-w-md w-full px-4">
        {children}
      </div>
    </div>
  );
};

export default HeroBanner;