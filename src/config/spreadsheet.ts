import { SpreadsheetConfig } from '../utils/spreadsheet';

export const spreadsheetConfig: SpreadsheetConfig = {
  type: 'google',
  sourceId: import.meta.env.VITE_GOOGLE_SHEETS_ID ?? '',
  ranges: [
    {
      range: 'Summary!C27',  // Health Score
      targetId: 'status',
      mapping: { 'C27': 'health' }
    },
    {
      range: 'Summary!G27',  // Risks
      targetId: 'status',
      mapping: { 'G27': 'risks' }
    },
    {
      range: 'Summary!J27',  // Assumptions
      targetId: 'status',
      mapping: { 'J27': 'assumptions' }
    },
    {
      range: 'Summary!M27',  // Issues
      targetId: 'status',
      mapping: { 'M27': 'issues' }
    },
    {
      range: 'Summary!P27',  // Dependencies
      targetId: 'status',
      mapping: { 'P27': 'dependencies' }
    }
  ]
};