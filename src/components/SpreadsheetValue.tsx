import React from 'react';
import { useSpreadsheetData } from '../hooks/useSpreadsheetData';
import type { SpreadsheetConfig } from '../utils/spreadsheet';

interface SpreadsheetValueProps {
  config: SpreadsheetConfig;
  targetId: string;
  field: string;
  format?: (value: any) => string;
}

export const SpreadsheetValue: React.FC<SpreadsheetValueProps> = ({
  config,
  targetId,
  field,
  format = (v) => String(v)
}) => {
  const { data, loading, error } = useSpreadsheetData(config);
  
  if (loading) return <span className="animate-pulse">Loading...</span>;
  if (error) return <span className="text-red-500">Error loading data</span>;
  
  const value = data[targetId]?.[field];
  return <span>{format(value)}</span>;
}