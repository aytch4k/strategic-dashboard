import React from 'react';
import { SHEET_IDS, type SheetName } from '../../utils/sheetIds';

interface SheetLinkProps {
  sheetId: string;
  sheetName: SheetName;
  children: React.ReactNode;
}

export const SheetLink: React.FC<SheetLinkProps> = ({ sheetId, sheetName, children }) => {
  const gid = SHEET_IDS[sheetName];
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=${gid}`;
  
  return (
    <a 
      href={sheetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  );
};