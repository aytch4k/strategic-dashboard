import React from 'react';
import { Modal } from '../ui/Modal';
import { useSpreadsheetData } from '../../hooks/useSpreadsheetData';
import { linksConfig } from '../../config/linksConfig';
import { ExternalLink } from 'lucide-react';

interface Link {
  ID: string;
  Name: string;
  Description: string;
  URL: string;
}

interface LinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
  const { data, loading, error } = useSpreadsheetData(linksConfig);
  const links = Array.isArray(data?.links) ? data.links : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Links" maxWidth="50%">
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`skeleton-${i}`} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">Failed to load links: {error.message}</div>
      ) : links.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No links available</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {links.map((link: Link) => (
            <a
              key={link.ID}
              href={link.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{link.Name}</h4>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">{link.Description}</p>
            </a>
          ))}
        </div>
      )}
    </Modal>
  );
};