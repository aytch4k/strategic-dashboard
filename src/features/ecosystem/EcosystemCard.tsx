import React, { useState } from 'react';
import { Network, ExternalLink } from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';
import { useSpreadsheetData } from '../../hooks/useSpreadsheetData';
import { ecosystemConfig } from './ecosystemConfig';
import { EcosystemMetricsModal } from './EcosystemMetricsModal';
import { formatNumber } from '../../utils/formatters';

export const EcosystemCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useSpreadsheetData(ecosystemConfig);

  return (
    <>
      <MetricCard
        title="Ecosystem Growth"
        icon={<Network className="w-6 h-6 text-purple-500" />}
        loading={loading}
        error={error}
        action={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-sm text-purple-500 hover:text-purple-600"
          >
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Total Projects</h4>
            <div className="text-2xl font-bold">{formatNumber(data?.projects?.total || 0)}</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Active Developers</h4>
            <div className="text-2xl font-bold">{formatNumber(data?.developers?.active || 0)}</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">TVL</h4>
            <div className="text-2xl font-bold">${formatNumber(data?.tvl?.current || 0)}M</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Monthly Growth</h4>
            <div className="text-2xl font-bold">{((data?.tvl?.growth || 0) * 100).toFixed(1)}%</div>
          </div>
        </div>
      </MetricCard>
      
      <EcosystemMetricsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};