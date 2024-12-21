import React from 'react';
import { Modal } from '../ui/Modal';
import { LinearDashboard } from '../../features/linear/LinearDashboard';

interface LinearModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinearModal: React.FC<LinearModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Engineering Dashboard" maxWidth="90%">
      <LinearDashboard />
    </Modal>
  );
};