import { useEffect } from 'react';
import { useStatusStore } from '../store/statusStore';
import { fetchGoogleSheetData } from '../utils/spreadsheet';
import { spreadsheetConfig } from '../config/spreadsheet';

const FETCH_INTERVAL = 60000; // 1 minute

// Default values when API fails
const DEFAULT_VALUES = {
  risks: 2,
  assumptions: 3,
  issues: 1,
  dependencies: 4,
  health: 85
};

export function useSpreadsheetFallback() {
  const setStatus = useStatusStore((state) => state.setStatus);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        for (const { range, targetId, mapping } of spreadsheetConfig.ranges) {
          if (!mounted) return;
          
          const data = await fetchGoogleSheetData(spreadsheetConfig.sourceId, range);
          
          if (data.values?.[0]?.[0] !== undefined) {
            const value = Number(data.values[0][0]);
            const key = Object.values(mapping)[0] as keyof typeof DEFAULT_VALUES;
            
            if (!isNaN(value)) {
              setStatus(key, value);
            } else {
              setStatus(key, DEFAULT_VALUES[key]);
            }
          } else {
            const key = Object.values(mapping)[0] as keyof typeof DEFAULT_VALUES;
            setStatus(key, DEFAULT_VALUES[key]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch spreadsheet data:', error);
        Object.entries(DEFAULT_VALUES).forEach(([key, value]) => {
          setStatus(key as keyof typeof DEFAULT_VALUES, value);
        });
      }
    }

    fetchData();
    const interval = setInterval(fetchData, FETCH_INTERVAL);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [setStatus]);
}