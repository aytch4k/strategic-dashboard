import React from 'react';
import { Target, AlertTriangle, XOctagon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Strategy } from '../../types/dashboard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { getStatusColors } from '../../utils/statusColors';

interface StrategyCardProps {
  strategy: Strategy;
  onPrev?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

const statusIcons = {
  'on-track': <Target className="w-5 h-5" />,
  'at-risk': <AlertTriangle className="w-5 h-5" />,
  'blocked': <XOctagon className="w-5 h-5" />
};

export const StrategyCard: React.FC<StrategyCardProps> = ({ 
  strategy, 
  onPrev, 
  onNext,
  showNavigation = true
}) => {
  const statusColor = getStatusColors(strategy.status);
  const Icon = statusIcons[strategy.status];

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {showNavigation && (
            <button
              onClick={onPrev}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous strategy"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          )}
          <h3 className="font-semibold">{strategy.title}</h3>
          {showNavigation && (
            <button
              onClick={onNext}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next strategy"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
        <div className={statusColor.icon}>{Icon}</div>
      </div>
      <p className="text-gray-600 mb-3">{strategy.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Owner: {strategy.owner}</span>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColor.bg} transition-all duration-300`}
              style={{ width: `${Math.min(Math.max(strategy.progress, 0), 100)}%` }}
            />
          </div>
          <span className={`font-medium ${statusColor.text}`}>
            {strategy.progress}%
          </span>
        </div>
      </div>
    </div>
  );
};