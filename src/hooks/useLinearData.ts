import { useState, useEffect } from 'react';
import { fetchIssueMetrics, fetchVelocityData } from '../services/linear/issues';
import { fetchCurrentCycle } from '../services/linear/cycles';
import { fetchProjectMetrics } from '../services/linear/projects';

interface LinearData {
  issues: Awaited<ReturnType<typeof fetchIssueMetrics>>;
  cycle: Awaited<ReturnType<typeof fetchCurrentCycle>>;
  velocity: Awaited<ReturnType<typeof fetchVelocityData>>;
  projects: Awaited<ReturnType<typeof fetchProjectMetrics>>;
}

export function useLinearData() {
  const [data, setData] = useState<LinearData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLinearData() {
      try {
        setLoading(true);

        const [issues, cycle, velocity, projects] = await Promise.all([
          fetchIssueMetrics(),
          fetchCurrentCycle(),
          fetchVelocityData(),
          fetchProjectMetrics()
        ]);

        setData({ issues, cycle, velocity, projects });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Linear data'));
      } finally {
        setLoading(false);
      }
    }

    fetchLinearData();
    const interval = setInterval(fetchLinearData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}