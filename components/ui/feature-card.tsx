import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconTextColor: string;
}

export function FeatureCard({ icon, title, description, iconBgColor, iconTextColor }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
        <div className={iconTextColor}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

