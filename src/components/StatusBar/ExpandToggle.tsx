import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useStatusBarStore } from '../../store/statusBarStore';

export const ExpandToggle: React.FC = () => {
  const { isExpanded, toggleExpanded } = useStatusBarStore();

  return (
    <button
      onClick={toggleExpanded}
      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label={isExpanded ? 'Collapse metrics' : 'Expand metrics'}
    >
      {isExpanded ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </button>
  );
};