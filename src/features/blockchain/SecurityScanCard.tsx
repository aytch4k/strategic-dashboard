import React from 'react';
import { Shield, AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';
import { SecurityMetrics } from '../../types/blockchain';

interface SecurityScanCardProps {
  metrics: SecurityMetrics;
}

export const SecurityScanCard: React.FC<SecurityScanCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">Security Status</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Critical</p>
            <p className="text-xl font-bold">{metrics.criticalIssues}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">High</p>
            <p className="text-xl font-bold">{metrics.highIssues}</p>
          </div>
        </div>
      </div>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Last Scan</span>
          <span>{new Date(metrics.lastScanDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Next Scan</span>
          <span>{new Date(metrics.nextScanDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Audits Completed</span>
          <span>{metrics.auditsCompleted}</span>
        </div>
      </div>
    </div>
  );
};