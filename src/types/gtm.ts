export interface MarketingMetrics {
  reach: number;
  engagement: number;
  conversion: number;
  channels: {
    social: {
      followers: number;
      engagement: number;
      growth: number;
    };
    email: {
      subscribers: number;
      openRate: number;
      clickRate: number;
    };
    content: {
      articles: number;
      views: number;
      shares: number;
    };
  };
  campaigns: {
    active: number;
    completed: number;
    performance: number;
  };
}

export interface CommunityMetrics {
  members: number;
  growth: number;
  retention: number;
  engagement: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  contributors: {
    active: number;
    newJoins: number;
    retention: number;
  };
  events: {
    upcoming: number;
    completed: number;
    attendance: number;
  };
}

export interface PartnershipMetrics {
  active: number;
  pipeline: number;
  completed: number;
  categories: {
    technology: number;
    integration: number;
    distribution: number;
    research: number;
  };
  stages: {
    discovery: number;
    evaluation: number;
    negotiation: number;
    onboarding: number;
  };
  revenue: {
    current: number;
    projected: number;
    growth: number;
  };
}

export interface ProductMetrics {
  adoption: {
    users: number;
    growth: number;
    churn: number;
  };
  usage: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  feedback: {
    nps: number;
    satisfaction: number;
    reviews: number;
  };
  features: {
    launched: number;
    upcoming: number;
    requested: number;
  };
}

export interface SalesMetrics {
  pipeline: {
    value: number;
    deals: number;
    conversion: number;
  };
  revenue: {
    mrr: number;
    arr: number;
    growth: number;
  };
  segments: {
    enterprise: number;
    midMarket: number;
    smb: number;
  };
  performance: {
    deals: number;
    winRate: number;
    cycleTime: number;
  };
}

export interface GTMMetrics {
  marketing: MarketingMetrics;
  community: CommunityMetrics;
  partnerships: PartnershipMetrics;
  product: ProductMetrics;
  sales: SalesMetrics;
  status: 'pre-launch' | 'launching' | 'post-launch';
  phase: 'planning' | 'execution' | 'optimization';
}