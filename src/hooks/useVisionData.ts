import { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../utils/spreadsheet';
import type { VisionStatement } from '../types/dashboard';

export function useVisionData() {
  const [vision, setVision] = useState<VisionStatement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchVision() {
      const sheetId = import.meta.env.VITE_TIMELINE_SHEETS_ID;
      
      try {
        const response = await fetchGoogleSheetData(sheetId, 'Vision!A2:D2');
        
        if (!mounted) return;

        if (!response.values?.length) {
          setVision(null);
          return;
        }

        const row = response.values[0];
        const visionData: VisionStatement = {
          id: String(row[0] || ''),
          title: String(row[1] || ''),
          description: String(row[2] || ''),
          quarterYear: String(row[3] || '')
        };

        setVision(visionData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch vision data'));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchVision();
    const interval = setInterval(fetchVision, 60000); // Refresh every minute

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { vision, loading, error };
}