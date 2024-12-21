type StatusType = 'healthy' | 'at-risk' | 'critical';

export const getStatusGradient = (status: StatusType): string => {
  const gradients = {
    healthy: 'from-emerald-600 to-green-700',
    'at-risk': 'from-amber-500 to-yellow-600',
    critical: 'from-red-600 to-rose-700'
  };
  
  return gradients[status];
};