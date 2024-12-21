import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, EyeOff } from 'lucide-react';
import { useGridStore } from '../store/gridStore';

interface CardControlsProps {
  id: string;
  currentSize: { x: number; y: number };
}

export const CardControls: React.FC<CardControlsProps> = ({ id, currentSize }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const { updateGridItem, hideCard } = useGridStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setLongPressActive(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!longPressActive) {
      setShowMenu(!showMenu);
    }
    setLongPressActive(false);
  };

  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setLongPressActive(false);
  };

  return (
    <div ref={menuRef} className="absolute top-2 right-2 z-20">
      <div
        className={`cursor-${longPressActive ? 'move' : 'pointer'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
      </div>
      
      {showMenu && !longPressActive && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 text-sm">
          <div className="px-3 py-2 text-gray-500 font-medium">Card Options</div>
          
          <select
            value={`${currentSize.x}x${currentSize.y}`}
            onChange={(e) => {
              const [x, y] = e.target.value.split('x').map(Number);
              updateGridItem(id, { x, y });
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer outline-none"
          >
            <option value="1x1">Small (1x1)</option>
            <option value="2x1">Wide (2x1)</option>
            <option value="2x2">Large (2x2)</option>
            <option value="3x1">Extra Wide (3x1)</option>
            <option value="3x2">Extra Large (3x2)</option>
          </select>

          <button
            onClick={() => {
              hideCard(id);
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <EyeOff className="w-4 h-4" />
            Hide Card
          </button>
        </div>
      )}
    </div>
  );
};