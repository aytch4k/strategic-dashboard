import React from 'react';
import { useGridStore } from '../store/gridStore';
import { DraggableCard } from './DraggableCard';

interface GridCardProps {
  id: string;
  children: React.ReactNode;
}

export const GridCard: React.FC<GridCardProps> = ({ id, children }) => {
  const { isEditing, gridItems, updateGridPositions } = useGridStore();
  const item = gridItems.find((i) => i.id === id);

  if (!item) return null;

  const { gridSize } = item;
  
  const gridStyles = {
    gridColumn: `span ${gridSize.x * 4}`,
    gridRow: `span ${gridSize.y * 2}`,
    minHeight: `${gridSize.y * 200}px`,
  };

  const handleDragStart = (e: React.DragEvent, dragId: string) => {
    e.dataTransfer.setData('text/plain', dragId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropId: string) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData('text/plain');
    if (dragId !== dropId) {
      updateGridPositions(dragId, dropId);
    }
  };

  return (
    <div
      className="relative transition-all duration-300 ease-in-out"
      style={gridStyles}
    >
      <DraggableCard
        id={id}
        gridSize={gridSize}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="h-full overflow-hidden">
          {children}
        </div>
      </DraggableCard>
    </div>
  );
};