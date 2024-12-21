export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat().format(value);
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};