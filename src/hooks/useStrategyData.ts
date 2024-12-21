import { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../utils/spreadsheet';
import type { Strategy } from '../types/dashboard';
import { validateStrategyStatus } from '../utils/strategyHelpers';

export function useStrategyData() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchStrategies() {
      const sheetId = import.meta.env.VITE_TIMELINE_SHEETS_ID;
      
      try {
        // Using the Strategy sheet with gid=2095617033
        const response = await fetchGoogleSheetData(sheetId, 'Strategy!A2:F');
        
        if (!mounted) return;

        if (!response.values?.length) {
          setStrategies([]);
          return;
        }

        const strategyItems: Strategy[] = response.values
          .filter(row => row.length >= 5)
          .map(row => ({
            id: String(row[0] || ''),
            title: String(row[1] || ''),
            description: String(row[2] || ''),
            owner: String(row[3] || ''),
            progress: Number(row[4]) || 0,
            status: validateStrategyStatus(String(row[5] || ''))
          }));

        setStrategies(strategyItems);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch strategy data'));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchStrategies();
    const interval = setInterval(fetchStrategies, 60000); // Refresh every minute

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { strategies, loading, error };
}