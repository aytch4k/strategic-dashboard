import React from 'react';
import { useTimelineData } from '../../hooks/useTimelineData';
import { TimelineItem } from './TimelineItem';
import { TimelineSkeleton } from './TimelineSkeleton';

export const MilestoneTimeline: React.FC = () => {
  const { items, loading, error } = useTimelineData();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Mainnet Launch Timeline</h2>
      
      {loading && <TimelineSkeleton />}
      
      {error && (
        <div className="text-red-500 p-4 rounded-lg bg-red-50">
          Failed to load timeline data: {error.message}
        </div>
      )}
      
      {!loading && !error && items.length === 0 && (
        <div className="text-gray-500 text-center py-4">
          No timeline items found
        </div>
      )}
      
      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === items.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};