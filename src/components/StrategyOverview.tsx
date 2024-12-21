import React from 'react';
import { Target, AlertTriangle, XOctagon } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const statusIcons = {
  'on-track': <Target className="w-5 h-5 text-green-500" />,
  'at-risk': <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  'blocked': <XOctagon className="w-5 h-5 text-red-500" />
};

export const StrategyOverview: React.FC = () => {
  const strategies = useDashboardStore((state) => state.strategies);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Strategic Initiatives</h2>
      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div 
            key={strategy.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{strategy.title}</h3>
              {statusIcons[strategy.status]}
            </div>
            <p className="text-gray-600 mb-3">{strategy.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Owner: {strategy.owner}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${strategy.progress}%` }}
                  />
                </div>
                <span className="text-blue-600 font-medium">
                  {strategy.progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};