import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { MBTIType } from '@/types';
import { useStats } from '@/hooks/useStats';
import { getTypePercentage } from '@/utils/storage';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  currentType?: MBTIType;
}

export const StatsChart: React.FC<StatsChartProps> = ({ currentType }) => {
  const { stats } = useStats();

  const mbtiTypes: MBTIType[] = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ];

  const data = {
    labels: mbtiTypes,
    datasets: [
      {
        label: '백분율 (%)',
        data: mbtiTypes.map(type => getTypePercentage(type, stats)),
        backgroundColor: mbtiTypes.map(type =>
          type === currentType
            ? 'rgba(99, 102, 241, 0.8)' // 현재 타입 강조
            : 'rgba(139, 92, 246, 0.6)'
        ),
        borderColor: mbtiTypes.map(type =>
          type === currentType
            ? 'rgba(99, 102, 241, 1)'
            : 'rgba(139, 92, 246, 1)'
        ),
        borderWidth: 1,
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const type = context.label as MBTIType;
            const percentage = context.parsed.y;
            const count = stats.typeDistribution[type];
            return `${percentage.toFixed(1)}% (${count}명)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(
          ...mbtiTypes.map(type => getTypePercentage(type, stats)),
          10
        ) + 5,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          전체 참여자: <span className="font-bold text-primary">{stats.totalTests.toLocaleString()}</span>명
        </p>
        {currentType && (
          <p className="text-gray-600 mt-2">
            {currentType} 유형: <span className="font-bold text-primary">
              {getTypePercentage(currentType, stats).toFixed(1)}%
            </span> ({stats.typeDistribution[currentType]}명)
          </p>
        )}
      </div>

      <div className="h-80 md:h-96">
        <Bar data={data} options={options} />
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-xs text-gray-600">
        {mbtiTypes.map(type => (
          <div
            key={type}
            className={`text-center p-2 rounded ${
              type === currentType ? 'bg-primary text-white font-bold' : 'bg-gray-100'
            }`}
          >
            <div>{type}</div>
            <div className="text-xs mt-1">
              {stats.typeDistribution[type]}명
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
