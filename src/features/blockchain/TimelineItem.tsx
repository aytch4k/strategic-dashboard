import React from 'react';
import { Clock, Check, AlertTriangle, XCircle } from 'lucide-react';
import { TimelineItem as TimelineItemType } from '../../types/timeline';
import { formatDate } from '../../utils/dateHelpers';

const statusIcons = {
  'not-started': <Clock className="w-5 h-5 text-gray-400" />,
  'in-progress': <Clock className="w-5 h-5 text-blue-500" />,
  'completed': <Check className="w-5 h-5 text-green-500" />,
  'blocked': <XCircle className="w-5 h-5 text-red-500" />
};

const statusColors = {
  'not-started': 'bg-gray-300',
  'in-progress': 'bg-blue-500',
  'completed': 'bg-green-500',
  'blocked': 'bg-red-500'
};

interface TimelineItemProps {
  item: TimelineItemType;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-gray-200" />
      )}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          {statusIcons[item.status]}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <span className="text-sm text-gray-500">
              Target: {formatDate(item.targetDate)}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${statusColors[item.status]} rounded-full transition-all duration-300`}
              style={{ width: `${Math.min(Math.max(item.progress, 0), 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};