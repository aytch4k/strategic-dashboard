export interface VisionStatement {
  id?: string;
  title: string;
  description: string;
  quarterYear: string;
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  owner: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'blocked';
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  category: string;
}

export interface GridItem {
  id: string;
  type: 'vision' | 'milestone' | 'nodeSale' | 'security' | 'strategies' | 'kpi' | 'gtm' | 'ecosystem';
  gridSize: {
    x: number;
    y: number;
  };
}

export interface DashboardState {
  isEditing: boolean;
  gridItems: GridItem[];
}