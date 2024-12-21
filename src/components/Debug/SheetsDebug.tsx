import React, { useState, useEffect } from 'react';

interface DebugInfo {
  timelineId: string;
  apiKey: string;
  status: 'checking' | 'success' | 'error';
  error?: string;
  data?: any;
}

export const SheetsDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    timelineId: import.meta.env.VITE_TIMELINE_SHEETS_ID || 'not set',
    apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY ? 'present' : 'not set',
    status: 'checking'
  });

  useEffect(() => {
    async function checkAccess() {
      if (!debugInfo.timelineId || !import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
        setDebugInfo(prev => ({
          ...prev,
          status: 'error',
          error: 'Missing required environment variables'
        }));
        return;
      }

      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${debugInfo.timelineId}/values/Timeline!A2:H?key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          setDebugInfo(prev => ({
            ...prev,
            status: 'error',
            error: data.error?.message || 'API request failed',
            data
          }));
          return;
        }

        setDebugInfo(prev => ({
          ...prev,
          status: 'success',
          data
        }));
      } catch (error) {
        setDebugInfo(prev => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    }

    checkAccess();
  }, [debugInfo.timelineId]);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg max-w-md">
      <h3 className="text-lg font-semibold mb-2">Sheets Debug Info</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Timeline ID: </span>
          <span className="font-mono">{debugInfo.timelineId}</span>
        </div>
        <div>
          <span className="font-medium">API Key: </span>
          <span className="font-mono">{debugInfo.apiKey}</span>
        </div>
        <div>
          <span className="font-medium">Status: </span>
          <span className={`font-medium ${
            debugInfo.status === 'success' ? 'text-green-600' :
            debugInfo.status === 'error' ? 'text-red-600' :
            'text-yellow-600'
          }`}>
            {debugInfo.status}
          </span>
        </div>
        {debugInfo.error && (
          <div className="text-red-600">
            <span className="font-medium">Error: </span>
            {debugInfo.error}
          </div>
        )}
        {debugInfo.data && (
          <div>
            <span className="font-medium">Data: </span>
            <pre className="mt-1 p-2 bg-gray-100 rounded overflow-auto max-h-40">
              {JSON.stringify(debugInfo.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};