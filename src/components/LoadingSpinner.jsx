import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'dukicks-blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    'dukicks-blue': 'border-dukicks-blue',
    'white': 'border-white',
    'gray': 'border-gray-400'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  );
};

export default LoadingSpinner;