import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SheetLink } from './SheetLink';
import type { SheetName } from '../../utils/sheetIds';

interface StatusItemProps {
  icon: LucideIcon;
  label: string;
  value: number;
  sheetName: SheetName;
}

export const StatusItem: React.FC<StatusItemProps> = ({
  icon: Icon,
  label,
  value,
  sheetName
}) => {
  const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID;

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Icon className="w-5 h-5 text-gray-600" />
      <SheetLink sheetId={sheetId} sheetName={sheetName}>
        <div className="flex flex-col hover:cursor-pointer">
          <span className="text-sm text-gray-500">{label}</span>
          <span className="font-semibold">{value}</span>
        </div>
      </SheetLink>
    </div>
  );
};