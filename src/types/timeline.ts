export interface TimelineItem {
  id: string;
  name: string;
  description: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  dependencies?: string[];
}

export interface TimelineData {
  items: TimelineItem[];
  loading: boolean;
  error: Error | null;
}