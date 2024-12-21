import { create } from 'zustand';
import type { VisionStatement, Strategy, OKR, KPI } from '../types/dashboard';

interface DashboardState {
  vision: VisionStatement | null;
  strategies: Strategy[];
  okrs: OKR[];
  kpis: KPI[];
  setVision: (vision: VisionStatement) => void;
  setStrategies: (strategies: Strategy[]) => void;
  setOKRs: (okrs: OKR[]) => void;
  setKPIs: (kpis: KPI[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  vision: null,
  strategies: [],
  okrs: [],
  kpis: [],
  setVision: (vision) => set({ vision }),
  setStrategies: (strategies) => set({ strategies }),
  setOKRs: (okrs) => set({ okrs }),
  setKPIs: (kpis) => set({ kpis }),
}));