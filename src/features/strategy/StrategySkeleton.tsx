import React from 'react';

export const StrategySkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="w-32 h-2 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}