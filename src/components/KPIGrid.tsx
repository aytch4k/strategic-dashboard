import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const trendIcons = {
  up: <TrendingUp className="w-5 h-5 text-green-500" />,
  down: <TrendingDown className="w-5 h-5 text-red-500" />,
  stable: <Minus className="w-5 h-5 text-gray-500" />
};

export const KPIGrid: React.FC = () => {
  const kpis = useDashboardStore((state) => state.kpis);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <div 
          key={kpi.id}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{kpi.name}</h3>
            {trendIcons[kpi.trend]}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">
              {kpi.value}
              <span className="text-sm ml-1">{kpi.unit}</span>
            </span>
            <span className="text-gray-500 text-sm mb-1">
              / {kpi.target} target
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-500">{kpi.category}</div>
        </div>
      ))}
    </div>
  );
};