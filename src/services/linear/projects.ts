import { linearClient } from './client';
import { PROJECTS_QUERY } from './queries';

export async function fetchProjectMetrics() {
  const data = await linearClient.request(PROJECTS_QUERY);
  const projects = data.projects.nodes;

  return {
    active: projects.length,
    onTrack: projects.filter((p: any) => p.state === 'started').length,
    atRisk: projects.filter((p: any) => p.state === 'planned').length,
    blocked: projects.filter((p: any) => p.state === 'paused').length
  };
}