import React from 'react';
import { Activity } from 'lucide-react';
import { SheetLink } from './SheetLink';
import { HealthColor } from '../../utils/healthScore';
import { useHealthScore } from '../../hooks/useHealthScore';

const colorClasses: Record<HealthColor, string> = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800'
};

export const HealthScoreItem: React.FC = () => {
  const { displayText, color } = useHealthScore();
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID;

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Activity className="w-5 h-5 text-gray-600" />
      <SheetLink sheetId={sheetId} sheetName="Health">
        <div className={`flex flex-col hover:cursor-pointer rounded-md px-2 ${colorClasses[color]}`}>
          <span className="text-sm opacity-75">Health Score</span>
          <span className="font-semibold">{displayText}</span>
        </div>
      </SheetLink>
    </div>
  );
};