import React from 'react';
import { Edit2, X } from 'lucide-react';
import { useGridStore } from '../store/gridStore';

export const EditButton: React.FC = () => {
  const { isEditing, setEditing } = useGridStore();

  return (
    <button
      onClick={() => setEditing(!isEditing)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
    >
      {isEditing ? (
        <>
          <X className="w-4 h-4" />
          <span>Done</span>
        </>
      ) : (
        <>
          <Edit2 className="w-4 h-4" />
          <span>Edit Dashboard</span>
        </>
      )}
    </button>
  );
};