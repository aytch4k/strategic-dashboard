import { create } from 'zustand';
import { GridItem } from '../types/dashboard';
import { persist } from 'zustand/middleware';

interface GridStore {
  isEditing: boolean;
  gridItems: GridItem[];
  hiddenCards: string[];
  setEditing: (isEditing: boolean) => void;
  updateGridItem: (id: string, size: { x: number; y: number }) => void;
  updateGridPositions: (dragId: string, dropId: string) => void;
  hideCard: (id: string) => void;
  unhideCard: (id: string) => void;
  addGridItem: (item: Omit<GridItem, 'id'>) => void;
}

export const useGridStore = create<GridStore>()(
  persist(
    (set) => ({
      isEditing: false,
      hiddenCards: [],
      gridItems: [
        { id: 'vision', type: 'vision', gridSize: { x: 3, y: 1 } },
        { id: 'strategies', type: 'strategies', gridSize: { x: 3, y: 1 } },
        { id: 'milestone', type: 'milestone', gridSize: { x: 3, y: 1 } },
        { id: 'gtm', type: 'gtm', gridSize: { x: 3, y: 1 } },
        { id: 'ecosystem', type: 'ecosystem', gridSize: { x: 3, y: 1 } },
        { id: 'nodeSale', type: 'nodeSale', gridSize: { x: 2, y: 1 } },
        { id: 'security', type: 'security', gridSize: { x: 2, y: 1 } },
        { id: 'kpi', type: 'kpi', gridSize: { x:2 , y: 1 } },
      ],
      setEditing: (isEditing) => set({ isEditing }),
      updateGridItem: (id, size) =>
        set((state) => ({
          gridItems: state.gridItems.map((item) =>
            item.id === id ? { ...item, gridSize: size } : item
          ),
        })),
      updateGridPositions: (dragId, dropId) =>
        set((state) => {
          const items = [...state.gridItems];
          const dragIndex = items.findIndex((item) => item.id === dragId);
          const dropIndex = items.findIndex((item) => item.id === dropId);
          
          if (dragIndex !== -1 && dropIndex !== -1) {
            const [draggedItem] = items.splice(dragIndex, 1);
            items.splice(dropIndex, 0, draggedItem);
          }
          
          return { gridItems: items };
        }),
      hideCard: (id) =>
        set((state) => ({
          hiddenCards: [...state.hiddenCards, id]
        })),
      unhideCard: (id) =>
        set((state) => ({
          hiddenCards: state.hiddenCards.filter((cardId) => cardId !== id)
        })),
      addGridItem: (item) =>
        set((state) => ({
          gridItems: [...state.gridItems, { ...item, id: crypto.randomUUID() }],
        })),
    }),
    {
      name: 'grid-store',
      partialize: (state) => ({ hiddenCards: state.hiddenCards }),
    }
  )
);