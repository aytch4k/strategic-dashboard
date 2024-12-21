import React from 'react';
import { Activity } from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';
import { useLinearData } from '../../hooks/useLinearData';
import { IssueMetrics } from './IssueMetrics';
import { CycleProgress } from './CycleProgress';
import { TeamVelocity } from './TeamVelocity';
import { ProjectStatus } from './ProjectStatus';

export const LinearDashboard: React.FC = () => {
  const { data, loading, error } = useLinearData();

  return (
    <div className="space-y-6">
      <MetricCard
        title="Engineering Metrics"
        icon={<Activity className="w-6 h-6 text-blue-500" />}
        loading={loading}
        error={error}
      >
        <div className="grid grid-cols-2 gap-6">
          <IssueMetrics data={data?.issues} />
          <CycleProgress data={data?.cycle} />
          <TeamVelocity data={data?.velocity} />
          <ProjectStatus data={data?.projects} />
        </div>
      </MetricCard>
    </div>
  );
};