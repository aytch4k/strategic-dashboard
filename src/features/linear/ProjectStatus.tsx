import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectStatusProps {
  data: {
    active: number;
    onTrack: number;
    atRisk: number;
    blocked: number;
  } | undefined;
}

export const ProjectStatus: React.FC<ProjectStatusProps> = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: ['On Track', 'At Risk', 'Blocked'],
    datasets: [
      {
        label: 'Projects',
        data: [data.onTrack, data.atRisk, data.blocked],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }
    ]
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-gray-600">Active Projects</div>
        <div className="text-2xl font-bold">{data.active}</div>
      </div>
      <div className="h-64">
        <Bar
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
                text: 'Project Status Distribution'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};