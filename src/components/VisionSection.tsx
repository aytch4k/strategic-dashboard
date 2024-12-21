import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

export const VisionSection: React.FC = () => {
  const vision = useDashboardStore((state) => state.vision);

  if (!vision) return null;

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg p-8 text-white shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <Lightbulb className="w-8 h-8" />
        <h2 className="text-2xl font-bold">Company Vision</h2>
      </div>
      <h3 className="text-xl font-semibold mb-4">{vision.title}</h3>
      <p className="text-lg opacity-90 mb-4">{vision.description}</p>
      <div className="text-sm opacity-75">
        {vision.quarterYear}
      </div>
    </div>
  );
};