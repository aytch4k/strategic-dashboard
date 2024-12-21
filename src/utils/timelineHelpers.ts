import { TimelineItem } from '../types/timeline';

type TimelineStatus = TimelineItem['status'];

const VALID_STATUSES: TimelineStatus[] = [
  'not-started',
  'in-progress',
  'completed',
  'blocked'
];

export function validateStatus(status: string): TimelineStatus {
  const normalizedStatus = status.toLowerCase().trim().replace(/\s+/g, '-');
  return VALID_STATUSES.includes(normalizedStatus as TimelineStatus)
    ? (normalizedStatus as TimelineStatus)
    : 'not-started';
}