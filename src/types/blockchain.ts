export interface Milestone {
  id: string;
  name: string;
  description: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  dependencies?: string[];
}

export interface NodeSaleMetrics {
  totalNodes: number;
  nodesSold: number;
  averagePrice: number;
  targetDate: string;
  status: 'not-started' | 'active' | 'completed';
}

export interface AirdropMetrics {
  totalAllocation: number;
  claimed: number;
  eligibleWallets: number;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'active' | 'completed';
}

export interface SecurityMetrics {
  auditsCompleted: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lastScanDate: string;
  nextScanDate: string;
}

export interface PartnershipMetrics {
  totalPartnerships: number;
  activeDiscussions: number;
  completed: number;
  byCategory: {
    defi: number;
    gaming: number;
    infrastructure: number;
    other: number;
  };
}

export interface MarketingMetrics {
  socialMetrics: {
    twitter: number;
    discord: number;
    telegram: number;
  };
  campaignStatus: {
    active: number;
    completed: number;
    planned: number;
  };
  engagement: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}