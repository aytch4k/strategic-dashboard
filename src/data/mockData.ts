import { VisionStatement, Strategy, KPI } from '../types/dashboard';
import { NodeSaleMetrics, SecurityMetrics } from '../types/blockchain';

export const mockVision: VisionStatement = {
  title: "Building the Future of Work",
  description: "Transform how teams collaborate and deliver value through innovative software solutions that empower organizations to achieve their full potential.",
  quarterYear: "Q1 2024"
};

export const mockStrategies: Strategy[] = [
  {
    id: "1",
    title: "AI-Powered Workflow Automation",
    description: "Implement intelligent automation across key business processes to increase efficiency and reduce manual work.",
    owner: "Sarah Chen",
    progress: 65,
    status: "on-track"
  },
  {
    id: "2",
    title: "Global Market Expansion",
    description: "Scale our presence in EMEA and APAC regions through strategic partnerships and localized solutions.",
    owner: "Michael Rodriguez",
    progress: 40,
    status: "at-risk"
  }
];

export const mockKPIs: KPI[] = [
  {
    id: "1",
    name: "Customer Satisfaction",
    value: 92,
    target: 95,
    trend: "up",
    unit: "%",
    category: "Customer Success"
  },
  {
    id: "2",
    name: "Revenue Growth",
    value: 2.4,
    target: 3,
    trend: "up",
    unit: "M",
    category: "Financial"
  },
  {
    id: "3",
    name: "Sprint Velocity",
    value: 45,
    target: 50,
    trend: "stable",
    unit: "points",
    category: "Engineering"
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