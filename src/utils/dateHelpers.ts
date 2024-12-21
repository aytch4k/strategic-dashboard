import { format, parse } from 'date-fns';

export function formatDate(dateString: string): string {
  if (!dateString) return 'No date';

  try {
    // Handle ISO format (YYYY-MM-DD)
    if (dateString.includes('-')) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return format(date, 'MMMM d, yyyy');
      }
    }
    
    // Handle Google Sheets date serial number
    const serialNumber = parseInt(dateString, 10);
    if (!isNaN(serialNumber)) {
      // Excel/Google Sheets dates start from December 30, 1899
      const baseDate = new Date(1899, 11, 30);
      const targetDate = new Date(baseDate);
      targetDate.setDate(baseDate.getDate() + serialNumber);
      
      if (!isNaN(targetDate.getTime())) {
        return format(targetDate, 'MMMM d, yyyy');
      }
    }
    
    return 'Invalid date';
  } catch (error) {
    console.error('Date parsing error:', error);
    return 'Invalid date';
  }
}