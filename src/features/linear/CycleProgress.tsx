import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { format } from 'date-fns';
import { ArcElement, Tooltip } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

interface CycleProgressProps {
  data: {
    current: {
      progress: number;
      endDate: string;
      scope: number;
      completed: number;
    };
    previous: {
      completion: number;
      planned: number;
      actual: number;
    };
  } | undefined;
}

export const CycleProgress: React.FC<CycleProgressProps> = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [data.current.completed, data.current.scope - data.current.completed],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(229, 231, 235, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(229, 231, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  const daysLeft = Math.ceil((new Date(data.current.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">Current Cycle Progress</div>
          <div className="text-2xl font-bold">{Math.round(data.current.progress * 100)}%</div>
        </div>
        <div className="text-sm text-gray-600">
          {daysLeft} days left
        </div>
      </div>
      <div className="h-64 flex items-center justify-center">
        <div className="w-48">
          <Doughnut
            data={chartData}
            options={{
              cutout: '70%',
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Scope</div>
          <div className="font-medium">{data.current.scope} points</div>
        </div>
        <div>
          <div className="text-gray-600">Completed</div>
          <div className="font-medium">{data.current.completed} points</div>
        </div>
      </div>
    </div>
  );
};