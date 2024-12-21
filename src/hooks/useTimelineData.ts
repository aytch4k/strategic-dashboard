import { useState, useEffect } from 'react';
import { fetchGoogleSheetData } from '../utils/spreadsheet';
import { TimelineItem } from '../types/timeline';
import { validateStatus } from '../utils/timelineHelpers';

const REFRESH_INTERVAL = 60000; // 1 minute

export function useTimelineData() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchTimeline() {
      const sheetId = import.meta.env.VITE_TIMELINE_SHEETS_ID;
      
      if (!sheetId) {
        setError(new Error('Timeline configuration missing'));
        setLoading(false);
        return;
      }

      try {
        const response = await fetchGoogleSheetData(sheetId, 'Timeline!A1:H50');
        
        if (!mounted) return;

        if (!response.values?.length) {
          setItems([]);
          setLoading(false);
          return;
        }

        // Skip header row if present
        const dataRows = response.values[0][0] === 'ID' ? response.values.slice(1) : response.values;

        const timelineItems: TimelineItem[] = dataRows
          .filter(row => row.length >= 7)
          .map(row => ({
            id: String(row[0] || ''),
            name: String(row[1] || ''),
            description: String(row[2] || ''),
            startDate: String(row[3] || ''),
            targetDate: String(row[4] || ''),
            progress: Number(row[5]) || 0,
            status: validateStatus(String(row[6] || '')),
            dependencies: row[7] ? String(row[7]).split(',').map(id => id.trim()) : undefined
          }));

        setItems(timelineItems);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch timeline'));
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchTimeline();
    const interval = setInterval(fetchTimeline, REFRESH_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { items, loading, error };
}