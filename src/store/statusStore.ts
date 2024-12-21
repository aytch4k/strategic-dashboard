import { create } from 'zustand';

interface StatusState {
  risks: number;
  assumptions: number;
  issues: number;
  dependencies: number;
  health: number;
  setStatus: (key: keyof Omit<StatusState, 'setStatus'>, value: number) => void;
}

export const useStatusStore = create<StatusState>((set) => ({
  risks: 0,
  assumptions: 0,
  issues: 0,
  dependencies: 0,
  health: 0,
  setStatus: (key, value) => set((state) => ({ ...state, [key]: value })),
}));