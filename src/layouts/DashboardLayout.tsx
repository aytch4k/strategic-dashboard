import React from 'react';
import { StatusBar } from '../components/StatusBar/StatusBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StatusBar />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-12 auto-rows-auto gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};