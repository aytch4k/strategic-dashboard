import React, { useState } from 'react';
import { Megaphone, ExternalLink } from 'lucide-react';
import { MetricCard } from '../shared/MetricCard';
import { useSpreadsheetData } from '../../hooks/useSpreadsheetData';
import { gtmConfig } from './gtmConfig';
import { GTMMetricsModal } from './GTMMetricsModal';
import { formatNumber } from '../../utils/formatters';

export const GTMCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useSpreadsheetData(gtmConfig);

  return (
    <>
      <MetricCard
        title="Go To Market"
        icon={<Megaphone className="w-6 h-6 text-indigo-500" />}
        loading={loading}
        error={error}
        action={
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-600"
          >
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Marketing Reach</h4>
            <div className="text-2xl font-bold">{formatNumber(data?.marketing?.reach || 0)}</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Active Users</h4>
            <div className="text-2xl font-bold">{formatNumber(data?.product?.adoption?.users || 0)}</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Pipeline Value</h4>
            <div className="text-2xl font-bold">${formatNumber(data?.sales?.pipeline?.value || 0)}</div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Active Partners</h4>
            <div className="text-2xl font-bold">{formatNumber(data?.partnerships?.active || 0)}</div>
          </div>
        </div>
      </MetricCard>
      
      <GTMMetricsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};