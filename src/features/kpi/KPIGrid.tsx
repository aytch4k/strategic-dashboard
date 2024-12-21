import React from 'react';
import { KPI } from '../../types/dashboard';
import { KPICard } from './KPICard';

interface KPIGridProps {
  kpis: KPI[];
}

export const KPIGrid: React.FC<KPIGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
};