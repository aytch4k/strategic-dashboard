import { SpreadsheetConfig } from '../../utils/spreadsheet';

export const ecosystemConfig: SpreadsheetConfig = {
  type: 'google',
  sourceId: import.meta.env.VITE_TIMELINE_SHEETS_ID,
  ranges: [
    {
      range: 'Ecosystem!A2:D',
      targetId: 'projects',
      mapping: {
        'B': 'total',
        'C': 'active',
        'D': 'completed'
      }
    },
    {
      range: 'Ecosystem!E2:H',
      targetId: 'developers',
      mapping: {
        'F': 'active',
        'G': 'monthly',
        'H': 'growth'
      }
    },
    {
      range: 'Ecosystem!I2:L',
      targetId: 'tvl',
      mapping: {
        'J': 'current',
        'K': 'growth',
        'L': 'target'
      }
    }
  ]
};