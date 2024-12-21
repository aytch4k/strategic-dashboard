import { create } from 'zustand';

interface StatusBarState {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const useStatusBarStore = create<StatusBarState>((set) => ({
  isExpanded: false, // Changed default state to false
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));