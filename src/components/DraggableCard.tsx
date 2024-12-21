import React, { useState } from 'react';
import { useGridStore } from '../store/gridStore';
import { CardControls } from './CardControls';

interface DraggableCardProps {
  children: React.ReactNode;
  id: string;
  gridSize: { x: number; y: number };
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  children,
  id,
  gridSize,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const { isEditing } = useGridStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(e, id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable={isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className={`relative h-full bg-white rounded-lg shadow-sm ${
        isDragging ? 'opacity-50' : ''
      } ${isEditing ? 'cursor-move' : ''}`}
    >
      {isEditing && (
        <CardControls id={id} currentSize={gridSize} />
      )}
      <div className="h-full">
        {children}
      </div>
    </div>
  );
};