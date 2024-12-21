import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
  action?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  icon,
  children,
  loading,
  error,
  action
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          {action && <div className="w-20 h-8 bg-gray-200 rounded" />}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 text-red-500 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium">Error Loading Data</h3>
        </div>
        <p className="text-sm text-gray-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};