import { Strategy } from '../types/dashboard';
import { TimelineItem } from '../types/timeline';

type StatusColorConfig = {
  bg: string;
  text: string;
  icon: string;
};

export const getStatusColors = (status: Strategy['status'] | TimelineItem['status']): StatusColorConfig => {
  const colors: Record<string, StatusColorConfig> = {
    'on-track': {
      bg: 'bg-green-500',
      text: 'text-green-800',
      icon: 'text-green-500'
    },
    'at-risk': {
      bg: 'bg-yellow-500',
      text: 'text-yellow-800',
      icon: 'text-yellow-500'
    },
    'blocked': {
      bg: 'bg-red-500',
      text: 'text-red-800',
      icon: 'text-red-500'
    },
    'not-started': {
      bg: 'bg-gray-300',
      text: 'text-gray-800',
      icon: 'text-gray-400'
    },
    'in-progress': {
      bg: 'bg-blue-500',
      text: 'text-blue-800',
      icon: 'text-blue-500'
    },
    'completed': {
      bg: 'bg-green-500',
      text: 'text-green-800',
      icon: 'text-green-500'
    }
  };

  return colors[status] || colors['on-track'];
};