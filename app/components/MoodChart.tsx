'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MoodEntry } from '@/lib/types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MoodChartProps {
  entries: MoodEntry[];
  title?: string;
  color?: string;
}

export default function MoodChart({ entries, title = 'Mood Trend', color = '#1E3A8A' }: MoodChartProps) {
  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Prepare chart data
  const chartData = {
    labels: sortedEntries.map(entry => {
      const date = new Date(entry.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Mood Score',
        data: sortedEntries.map(entry => entry.moodScore),
        borderColor: color,
        backgroundColor: `${color}20`,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        color: '#1f2937',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function(context: any) {
            const entry = sortedEntries[context.dataIndex];
            return [
              `Mood: ${context.parsed.y}/10`,
              `Emotions: ${entry.emotions.join(', ')}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No mood data available yet.</p>
        <p className="text-sm text-gray-400 mt-2">Start tracking your mood to see trends!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={options} />
      </div>
      
      {/* Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-600">
            {(sortedEntries.reduce((sum, e) => sum + e.moodScore, 0) / sortedEntries.length).toFixed(1)}
          </div>
          <div className="text-xs text-gray-600 mt-1">Average Mood</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {Math.max(...sortedEntries.map(e => e.moodScore))}
          </div>
          <div className="text-xs text-gray-600 mt-1">Highest Mood</div>
        </div>
        
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {Math.min(...sortedEntries.map(e => e.moodScore))}
          </div>
          <div className="text-xs text-gray-600 mt-1">Lowest Mood</div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
