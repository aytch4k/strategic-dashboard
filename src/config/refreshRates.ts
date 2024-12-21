// Refresh intervals in milliseconds
export const DEFAULT_REFRESH_INTERVALS = {
  spreadsheet: 5 * 60 * 1000, // 5 minutes
  linear: 5 * 60 * 1000,      // 5 minutes
  health: 5 * 60 * 1000       // 5 minutes
} as const;

// Minimum allowed refresh intervals to prevent API rate limiting
export const MIN_REFRESH_INTERVALS = {
  spreadsheet: 60 * 1000,     // 1 minute
  linear: 60 * 1000,          // 1 minute
  health: 60 * 1000           // 1 minute
} as const;

let customIntervals: Partial<typeof DEFAULT_REFRESH_INTERVALS> = {};

export function setRefreshInterval(key: keyof typeof DEFAULT_REFRESH_INTERVALS, interval: number) {
  if (interval < MIN_REFRESH_INTERVALS[key]) {
    console.warn(`Refresh interval for ${key} cannot be less than ${MIN_REFRESH_INTERVALS[key]}ms`);
    return;
  }
  customIntervals[key] = interval;
}

export function getRefreshInterval(key: keyof typeof DEFAULT_REFRESH_INTERVALS): number {
  return customIntervals[key] || DEFAULT_REFRESH_INTERVALS[key];
}