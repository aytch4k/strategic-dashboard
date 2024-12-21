import React from 'react';
import { useStrategyData } from '../../hooks/useStrategyData';
import { StrategyCarousel } from './StrategyCarousel';
import { StrategySkeleton } from './StrategySkeleton';
import { MetricCard } from '../shared/MetricCard';
import { Target } from 'lucide-react';

export const StrategiesList: React.FC = () => {
  const { strategies, loading, error } = useStrategyData();

  // Sort strategies by ID to ensure correct order
  const sortedStrategies = [...(strategies || [])].sort((a, b) => {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    return idA - idB;
  });

  return (
    <MetricCard
      title="Strategic Initiatives"
      icon={<Target className="w-6 h-6 text-blue-500" />}
      loading={loading}
      error={error}
    >
      {loading ? (
        <StrategySkeleton />
      ) : sortedStrategies.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          No strategies found
        </div>
      ) : (
        <StrategyCarousel strategies={sortedStrategies} />
      )}
    </MetricCard>
  );
};