import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

interface TeamVelocityProps {
  data: {
    current: number;
    trend: number;
    history: Array<{
      week: string;
      points: number;
    }>;
  } | undefined;
}

export const TeamVelocity: React.FC<TeamVelocityProps> = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.history.map(item => format(new Date(item.week), 'MMM d')).reverse(),
    datasets: [
      {
        label: 'Story Points',
        data: data.history.map(item => item.points).reverse(),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4
      }
    ]
  };

  const trendColor = data.trend > 0 ? 'text-green-600' : 'text-red-600';
  const trendValue = Math.abs(Math.round(data.trend * 100));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">Current Velocity</div>
          <div className="text-2xl font-bold">{data.current} points</div>
        </div>
        <div className={`text-sm ${trendColor}`}>
          {data.trend > 0 ? '↑' : '↓'} {trendValue}% vs last week
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
                text: 'Team Velocity (12 Weeks)'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};