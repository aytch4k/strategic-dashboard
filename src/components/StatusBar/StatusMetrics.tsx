import React from 'react';
import { AlertCircle, AlertTriangle, Bug, Link2 } from 'lucide-react';
import { useStatusStore } from '../../store/statusStore';
import { useStatusBarStore } from '../../store/statusBarStore';
import { StatusItem } from './StatusItem';

export const StatusMetrics: React.FC = () => {
  const status = useStatusStore();
  const { isExpanded } = useStatusBarStore();

  return (
    <div
      className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded 
          ? 'w-auto opacity-100 translate-x-0' 
          : 'w-0 opacity-0 -translate-x-4'
      }`}
    >
      <StatusItem
        icon={AlertCircle}
        label="Risks"
        value={status.risks}
        sheetName="Risks"
      />
      <StatusItem
        icon={AlertTriangle}
        label="Assumptions"
        value={status.assumptions}
        sheetName="Assumptions"
      />
      <StatusItem
        icon={Bug}
        label="Issues"
        value={status.issues}
        sheetName="Issues"
      />
      <StatusItem
        icon={Link2}
        label="Dependencies"
        value={status.dependencies}
        sheetName="Dependencies"
      />
    </div>
  );
};