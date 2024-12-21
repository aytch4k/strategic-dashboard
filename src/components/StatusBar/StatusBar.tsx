import React from 'react';
import { HamburgerMenu } from './HamburgerMenu';
import { HealthScoreItem } from './HealthScoreItem';
import { StatusMetrics } from './StatusMetrics';
import { ExpandToggle } from './ExpandToggle';

export const StatusBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center divide-x">
          <div className="flex items-center">
            <HealthScoreItem />
            <ExpandToggle />
          </div>
          <StatusMetrics />
        </div>
        <div className="relative">
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
};