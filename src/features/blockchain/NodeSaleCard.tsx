import React from 'react';
import { Server, DollarSign } from 'lucide-react';
import { NodeSaleMetrics } from '../../types/blockchain';
import { ProgressBar } from '../../components/ui/ProgressBar';

interface NodeSaleCardProps {
  metrics: NodeSaleMetrics;
}

export const NodeSaleCard: React.FC<NodeSaleCardProps> = ({ metrics }) => {
  const progress = (metrics.nodesSold / metrics.totalNodes) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">Node Sale Progress</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          metrics.status === 'active' ? 'bg-green-100 text-green-800' :
          metrics.status === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {metrics.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Nodes Sold</p>
          <p className="text-2xl font-bold">{metrics.nodesSold}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Price</p>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4" />
            <span className="text-2xl font-bold">{metrics.averagePrice}</span>
          </div>
        </div>
      </div>

      <ProgressBar progress={progress} />
      
      <div className="mt-4 text-sm text-gray-500">
        Target Date: {new Date(metrics.targetDate).toLocaleDateString()}
      </div>
    </div>
  );
};