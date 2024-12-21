import { z } from 'zod';
import { CellValue, parseNumericValue, formatApiError } from './spreadsheetHelpers';

export const SpreadsheetConfigSchema = z.object({
  type: z.enum(['google']),
  sourceId: z.string(),
  ranges: z.array(z.object({
    range: z.string(),
    targetId: z.string(),
    mapping: z.record(z.string(), z.string()),
    isArray: z.boolean().optional()
  }))
});

export type SpreadsheetConfig = z.infer<typeof SpreadsheetConfigSchema>;

export async function fetchGoogleSheetData(spreadsheetId: string, range: string): Promise<{ values: CellValue[][] }> {
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  
  if (!apiKey || !spreadsheetId) {
    console.warn('Missing API key or spreadsheet ID - returning empty data');
    return { values: [] };
  }

  try {
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.warn(`API Error: ${formatApiError(data)}`);
      return { values: [] };
    }
    
    return {
      values: data.values || []
    };
  } catch (error) {
    console.warn('Failed to fetch spreadsheet data:', error);
    return { values: [] };
  }
}

export function mapSpreadsheetData(values: CellValue[][] | undefined, mapping: Record<string, string>, isArray = false): any {
  if (!values || values.length === 0) {
    return isArray ? [] : {};
  }

  if (isArray) {
    return values.map(row => {
      const item: Record<string, any> = {};
      Object.entries(mapping).forEach(([col, field]) => {
        const colIndex = col.toUpperCase().charCodeAt(0) - 65;
        if (colIndex >= 0 && colIndex < row.length) {
          item[field] = row[colIndex];
        } else {
          item[field] = null;
        }
      });
      return item;
    }).filter(item => Object.values(item).some(v => v !== null));
  }

  // For single row data
  const result: Record<string, any> = {};
  const targetRow = values[0] || [];

  Object.entries(mapping).forEach(([col, field]) => {
    const colIndex = col.toUpperCase().charCodeAt(0) - 65;
    if (colIndex >= 0 && colIndex < targetRow.length) {
      const value = targetRow[colIndex];
      result[field] = typeof value === 'number' ? value : parseNumericValue(value);
    } else {
      result[field] = 0;
    }
  });

  return result;
}