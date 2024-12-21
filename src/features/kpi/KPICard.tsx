import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '../../types/dashboard';

interface KPICardProps {
  kpi: KPI;
}

const trendIcons = {
  up: <TrendingUp className="w-5 h-5 text-green-500" />,
  down: <TrendingDown className="w-5 h-5 text-red-500" />,
  stable: <Minus className="w-5 h-5 text-gray-500" />
};

export const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{kpi.name}</h3>
        {trendIcons[kpi.trend]}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">
          {kpi.value}
          <span className="text-sm ml-1">{kpi.unit}</span>
        </span>
        <span className="text-gray-500 text-sm mb-1">/ {kpi.target} target</span>
      </div>
      <div className="mt-4 text-sm text-gray-500">{kpi.category}</div>
    </div>
  );
};