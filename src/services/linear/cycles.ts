import { linearClient } from './client';
import { CYCLES_QUERY } from './queries';

export async function fetchCurrentCycle() {
  const data = await linearClient.request(CYCLES_QUERY);
  const currentCycle = data.teams?.nodes[0]?.activeCycle;

  if (!currentCycle) {
    return {
      current: {
        progress: 0,
        endDate: '',
        scope: 0,
        completed: 0
      },
      previous: {
        completion: 0,
        planned: 0,
        actual: 0
      }
    };
  }

  return {
    current: {
      progress: currentCycle.progress || 0,
      endDate: currentCycle.endsAt || '',
      scope: currentCycle.scopeTarget || 0,
      completed: currentCycle.completedIssueCount || 0
    },
    previous: {
      completion: currentCycle.completedScopeTarget || 0,
      planned: currentCycle.scopeTarget || 0,
      actual: currentCycle.completedIssueCount || 0
    }
  };
}