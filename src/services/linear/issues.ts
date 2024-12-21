import { linearClient } from './client';
import { ISSUES_QUERY } from './queries';
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';

export async function fetchIssueMetrics() {
  const data = await linearClient.request(ISSUES_QUERY);
  const issues = data.issues.nodes;

  return {
    total: issues.length,
    completed: issues.filter(i => i.state?.type === 'completed').length,
    inProgress: issues.filter(i => i.state?.type === 'started').length,
    blocked: issues.filter(i => i.state?.type === 'blocked').length,
    byPriority: issues.reduce((acc: Record<string, number>, issue: any) => {
      const priority = issue.priority || 'none';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {})
  };
}

export async function fetchVelocityData() {
  const now = new Date();
  const velocityData = [];

  for (let i = 0; i < 12; i++) {
    const start = startOfWeek(subWeeks(now, i));
    const end = endOfWeek(subWeeks(now, i));
    
    const data = await linearClient.request(ISSUES_QUERY);
    const completedIssues = data.issues.nodes.filter((issue: any) => 
      issue.completedAt && new Date(issue.completedAt) >= start && new Date(issue.completedAt) <= end
    );

    velocityData.push({
      week: start.toISOString(),
      points: completedIssues.reduce((sum: number, issue: any) => sum + (issue.estimate || 0), 0)
    });
  }

  return {
    current: velocityData[0]?.points || 0,
    trend: ((velocityData[0]?.points || 0) - (velocityData[1]?.points || 0)) / (velocityData[1]?.points || 1),
    history: velocityData
  };
}