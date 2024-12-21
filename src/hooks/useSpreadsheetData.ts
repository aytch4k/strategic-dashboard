import { useState, useEffect } from 'react';
import { SpreadsheetConfig, fetchGoogleSheetData, mapSpreadsheetData } from '../utils/spreadsheet';
import { getRefreshInterval } from '../config/refreshRates';

export function useSpreadsheetData(config: SpreadsheetConfig) {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    async function fetchData() {
      if (!mounted) return;
      
      try {
        setLoading(true);
        const newData: Record<string, any> = {};
        
        for (const { range, targetId, mapping, isArray } of config.ranges) {
          if (!mounted) return;
          
          const rawData = await fetchGoogleSheetData(config.sourceId, range);
          const mappedData = mapSpreadsheetData(rawData.values, mapping, isArray);
          
          const path = targetId.split('.');
          let current = newData;
          
          path.forEach((key, index) => {
            if (index === path.length - 1) {
              current[key] = mappedData;
            } else {
              current[key] = current[key] || {};
              current = current[key];
            }
          });
        }
        
        if (mounted) {
          setData(newData);
          setError(null);
          retryCount = 0;
        }
      } catch (err) {
        console.warn('Spreadsheet data fetch error:', err);
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(fetchData, 1000 * retryCount);
        } else {
          setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, getRefreshInterval('spreadsheet'));
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [config]);

  return { data, loading, error };
}