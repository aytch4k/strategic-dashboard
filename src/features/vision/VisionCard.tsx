import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useVisionData } from '../../hooks/useVisionData';
import { getStatusGradient } from '../../utils/statusGradients';

interface VisionCardProps {
  status?: 'healthy' | 'at-risk' | 'critical';
}

export const VisionCard: React.FC<VisionCardProps> = ({ status = 'healthy' }) => {
  const { vision, loading, error } = useVisionData();

  if (loading) {
    return (
      <div className={`bg-gradient-to-r ${getStatusGradient(status)} rounded-lg p-8 text-white shadow-xl animate-pulse`}>
        <div className="flex items-center gap-4 mb-6">
          <Lightbulb className="w-8 h-8" />
          <div className="h-8 w-48 bg-white/20 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-white/20 rounded mb-4" />
        <div className="h-20 w-full bg-white/20 rounded mb-4" />
        <div className="h-4 w-24 bg-white/20 rounded" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg p-8 text-red-800 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <Lightbulb className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Error Loading Vision</h2>
        </div>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!vision) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-gray-500 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <Lightbulb className="w-8 h-8" />
          <h2 className="text-2xl font-bold">No Vision Statement</h2>
        </div>
        <p>Vision statement has not been defined.</p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r ${getStatusGradient(status)} rounded-lg p-8 text-white shadow-xl`}>
      <div className="flex items-center gap-4 mb-6">
        <Lightbulb className="w-8 h-8" />
        <h3 className="text-xl font-semibold">{vision.title}</h3>
      </div>
      <p className="text-lg opacity-90 mb-4">{vision.description}</p>
      <div className="text-sm opacity-75">{vision.quarterYear}</div>
    </div>
  );
};