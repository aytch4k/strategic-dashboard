import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-blue-600 font-medium">{progress}%</span>
    </div>
  );
};