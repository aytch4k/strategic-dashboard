import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IssueMetricsProps {
  data: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
    byPriority: Record<string, number>;
  } | undefined;
}

export const IssueMetrics: React.FC<IssueMetricsProps> = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: ['Urgent', 'High', 'Medium', 'Low', 'None'],
    datasets: [
      {
        label: 'Issues by Priority',
        data: [
          data.byPriority['urgent'] || 0,
          data.byPriority['high'] || 0,
          data.byPriority['medium'] || 0,
          data.byPriority['low'] || 0,
          data.byPriority['none'] || 0
        ],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">Total Issues</div>
          <div className="text-2xl font-bold text-blue-900">{data.total}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">Completed</div>
          <div className="text-2xl font-bold text-green-900">{data.completed}</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-sm text-yellow-600">In Progress</div>
          <div className="text-2xl font-bold text-yellow-900">{data.inProgress}</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-sm text-red-600">Blocked</div>
          <div className="text-2xl font-bold text-red-900">{data.blocked}</div>
        </div>
      </div>
      <div className="h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Issues by Priority'
              }
            }
          }}
        />
      </div>
    </div>
  );
};