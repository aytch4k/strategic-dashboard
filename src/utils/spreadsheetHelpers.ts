import { z } from 'zod';

// Types for spreadsheet cell values
export const CellValueSchema = z.union([
  z.number(),
  z.string(),
  z.boolean(),
  z.null()
]);

export type CellValue = z.infer<typeof CellValueSchema>;

// Helper to safely parse numeric values
export function parseNumericValue(value: CellValue): number {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

// Helper to validate cell range format
export function validateRange(range: string): boolean {
  return /^[A-Za-z]+![A-Z]+\d+$/.test(range);
}

// Helper to format API errors
export function formatApiError(error: any): string {
  if (error?.error?.message) {
    return `Google Sheets API Error: ${error.error.message}`;
  }
  return 'Failed to fetch spreadsheet data';
}