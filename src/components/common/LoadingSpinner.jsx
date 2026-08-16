import React from 'react';

export function LoadingSpinner({ size = 'md', message = 'Memuat data...' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-blue-600 border-t-transparent rounded-full animate-spin`}
      />
      {message && <p className="mt-3 text-sm text-gray-500">{message}</p>}
    </div>
  );
}
