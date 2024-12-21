import { 
  Milestone,
  NodeSaleMetrics,
  SecurityMetrics,
  AirdropMetrics,
  PartnershipMetrics,
  MarketingMetrics 
} from '../types/blockchain';

export const mockMilestones: Milestone[] = [
  {
    id: "1",
    name: "Node Sale",
    description: "Initial node operator selection and token distribution",
    startDate: "2024-03-01",
    targetDate: "2024-04-15",
    progress: 65,
    status: "in-progress"
  },
  {
    id: "2",
    name: "Security Audit",
    description: "Comprehensive security review and penetration testing",
    startDate: "2024-04-01",
    targetDate: "2024-05-15",
    progress: 20,
    status: "in-progress",
    dependencies: ["1"]
  },
  {
    id: "3",
    name: "Airdrop Distribution",
    description: "Community token distribution event",
    startDate: "2024-05-01",
    targetDate: "2024-05-15",
    progress: 0,
    status: "not-started",
    dependencies: ["1"]
  },
  {
    id: "4",
    name: "Mainnet Launch",
    description: "Official blockchain network launch",
    startDate: "2024-06-01",
    targetDate: "2024-06-15",
    progress: 0,
    status: "not-started",
    dependencies: ["1", "2", "3"]
  }
];

export const mockNodeSale: NodeSaleMetrics = {
  totalNodes: 100,
  nodesSold: 65,
  averagePrice: 50000,
  targetDate: "2024-04-15",
  status: "active"
};

export const mockSecurity: SecurityMetrics = {
  auditsCompleted: 2,
  criticalIssues: 0,
  highIssues: 3,
  mediumIssues: 7,
  lastScanDate: "2024-02-28",
  nextScanDate: "2024-03-15"
};