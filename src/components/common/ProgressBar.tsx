import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, progress }) => {
  return (
    <div className="w-full bg-white shadow-sm py-4 px-6 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            질문 {current}/{total}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
