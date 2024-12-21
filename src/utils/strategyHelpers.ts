import type { Strategy } from '../types/dashboard';

type StrategyStatus = Strategy['status'];

const VALID_STATUSES: StrategyStatus[] = [
  'on-track',
  'at-risk',
  'blocked'
];

export function validateStrategyStatus(status: string): StrategyStatus {
  const normalizedStatus = status.toLowerCase().trim().replace(/\s+/g, '-');
  return VALID_STATUSES.includes(normalizedStatus as StrategyStatus)
    ? (normalizedStatus as StrategyStatus)
    : 'on-track';
}