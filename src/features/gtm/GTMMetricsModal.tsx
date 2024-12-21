import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { useSpreadsheetData } from '../../hooks/useSpreadsheetData';
import { gtmConfig } from './gtmConfig';
import { formatPercentage, formatNumber } from '../../utils/formatters';

interface GTMMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GTMMetricsModal: React.FC<GTMMetricsModalProps> = ({ isOpen, onClose }) => {
  const { data } = useSpreadsheetData(gtmConfig);

  const sections = [
    {
      title: 'Marketing Channels',
      metrics: [
        { label: 'Social Followers', value: data?.marketing?.channels?.social?.followers, format: formatNumber },
        { label: 'Social Engagement', value: data?.marketing?.channels?.social?.engagement, format: formatPercentage },
        { label: 'Email Subscribers', value: data?.marketing?.channels?.email?.subscribers, format: formatNumber },
        { label: 'Email Open Rate', value: data?.marketing?.channels?.email?.openRate, format: formatPercentage },
        { label: 'Content Articles', value: data?.marketing?.channels?.content?.articles, format: formatNumber },
        { label: 'Content Views', value: data?.marketing?.channels?.content?.views, format: formatNumber }
      ]
    },
    {
      title: 'Community Growth',
      metrics: [
        { label: 'Growth Rate', value: data?.community?.growth, format: formatPercentage },
        { label: 'Retention Rate', value: data?.community?.retention, format: formatPercentage }
      ]
    },
    {
      title: 'Partnerships',
      metrics: [
        { label: 'Pipeline Deals', value: data?.partnerships?.pipeline, format: formatNumber },
        { label: 'Completed Deals', value: data?.partnerships?.completed, format: formatNumber }
      ]
    },
    {
      title: 'Product Adoption',
      metrics: [
        { label: 'User Growth', value: data?.product?.adoption?.growth, format: formatPercentage },
        { label: 'Churn Rate', value: data?.product?.adoption?.churn, format: formatPercentage }
      ]
    },
    {
      title: 'Sales Pipeline',
      metrics: [
        { label: 'Pipeline Value', value: data?.sales?.pipeline?.value, format: (v) => `$${formatNumber(v)}` },
        { label: 'Conversion Rate', value: data?.sales?.pipeline?.conversion, format: formatPercentage }
      ]
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Go To Market Metrics">
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