// Utility to test Google Sheets API access and log results
export async function testSheetsAccess() {
  console.log('Starting sheets access test...');
  
  const timelineSheetId = import.meta.env.VITE_TIMELINE_SHEETS_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  
  console.log('Environment variables:', {
    hasTimelineId: !!timelineSheetId,
    hasApiKey: !!apiKey
  });
  
  if (!timelineSheetId || !apiKey) {
    console.error('Missing required environment variables');
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${timelineSheetId}/values/Timeline!A2:H?key=${apiKey}`;
  console.log('Fetching from URL:', url);
  
  try {
    console.log('Sending request...');
    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data.error);
      return;
    }
    
    console.log('Timeline Data:', data.values);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}