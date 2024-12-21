import { SpreadsheetConfig } from '../utils/spreadsheet';

export const linksConfig: SpreadsheetConfig = {
  type: 'google',
  sourceId: import.meta.env.VITE_TIMELINE_SHEETS_ID,
  ranges: [
    {
      range: 'URL!A2:D', // Changed from Links to URL as per sheet name
      targetId: 'links',
      mapping: {
        'A': 'ID',
        'B': 'Name',
        'C': 'Description',
        'D': 'URL'
      },
      isArray: true
    }
  ]
};