import React, { useState, useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { useGridStore } from '../store/gridStore';

const cardNames: Record<string, string> = {
  vision: 'Vision Statement',
  strategies: 'Strategic Initiatives',
  milestone: 'Mainnet Timeline',
  gtm: 'Go To Market',
  ecosystem: 'Ecosystem Growth',
  nodeSale: 'Node Sale Progress',
  security: 'Security Status',
  kpi: 'Key Performance Indicators'
};

export const UnhideMenu: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { hiddenCards, unhideCard } = useGridStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (hiddenCards.length === 0) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        title="Show Hidden Cards"
      >
        <Eye className="w-5 h-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 text-sm">
          <div className="px-3 py-2 text-gray-500 font-medium">Hidden Cards</div>
          {hiddenCards.map((id) => (
            <button
              key={id}
              onClick={() => {
                unhideCard(id);
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              {cardNames[id] || id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};