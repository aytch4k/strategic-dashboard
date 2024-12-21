import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { useSpreadsheetData } from '../../hooks/useSpreadsheetData';
import { ecosystemConfig } from './ecosystemConfig';
import { formatPercentage, formatNumber } from '../../utils/formatters';

interface EcosystemMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcosystemMetricsModal: React.FC<EcosystemMetricsModalProps> = ({ isOpen, onClose }) => {
  const { data } = useSpreadsheetData(ecosystemConfig);

  const sections = [
    {
      title: 'Project Metrics',
      metrics: [
        { label: 'Active Projects', value: data?.projects?.active, format: formatNumber },
        { label: 'Completed Projects', value: data?.projects?.completed, format: formatNumber }
      ]
    },
    {
      title: 'Developer Activity',
      metrics: [
        { label: 'Monthly Active', value: data?.developers?.monthly, format: formatNumber },
        { label: 'Growth Rate', value: data?.developers?.growth, format: formatPercentage }
      ]
    },
    {
      title: 'TVL Statistics',
      metrics: [
        { label: 'Growth Rate', value: data?.tvl?.growth, format: formatPercentage },
        { label: 'Target TVL', value: data?.tvl?.target, format: (v) => `$${formatNumber(v)}M` }
      ]
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ecosystem Metrics">
      <div className="grid grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-4">{section.title}</h4>
            <div className="space-y-3">
              {section.metrics.map((metric) => (
                <div key={metric.label} className="flex justify-between items-center">
                  <span className="text-gray-600">{metric.label}</span>
                  <span className="font-medium">{metric.format(metric.value || 0)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};