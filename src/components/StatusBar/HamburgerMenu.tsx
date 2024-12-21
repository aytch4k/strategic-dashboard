import React, { useState } from 'react';
import { Menu, X, Settings, Link2, BarChart2 } from 'lucide-react';
import { useGridStore } from '../../store/gridStore';
import { LinksModal } from './LinksModal';
import { LinearModal } from './LinearModal';

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [showLinearModal, setShowLinearModal] = useState(false);
  const { isEditing, setEditing } = useGridStore();

  const menuItems = [
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Engineering Metrics",
      onClick: () => {
        setShowLinearModal(true);
        setIsOpen(false);
      }
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      label: "Quick Links",
      onClick: () => {
        setShowLinksModal(true);
        setIsOpen(false);
      }
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: isEditing ? "Exit Edit Mode" : "Edit Dashboard",
      onClick: () => {
        setEditing(!isEditing);
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-16 w-64 bg-white rounded-lg shadow-lg py-2 border">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <LinksModal isOpen={showLinksModal} onClose={() => setShowLinksModal(false)} />
      <LinearModal isOpen={showLinearModal} onClose={() => setShowLinearModal(false)} />
    </>
  );
}