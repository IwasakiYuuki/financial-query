'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HistogramData {
  bin: number;
  freq: number;
}

interface HistogramChartProps {
  data: HistogramData[];
  title: string;
}

export default function HistogramChart({ data, title }: HistogramChartProps) {
  console.log('Chart data:', data); // デバッグ用

  // 範囲ラベルを生成（例: "500-999", "1000-1499"）
  const createRangeLabel = (bin: number, index: number, array: HistogramData[]) => {
    const nextBin = index < array.length - 1 ? array[index + 1].bin : bin + 500;
    return `${bin.toLocaleString()}-${(nextBin - 1).toLocaleString()}`;
  };

  const chartData = {
    labels: data.map((item, index) => createRangeLabel(item.bin, index, data)),
    datasets: [
      {
        label: '頻度',
        data: data.map(item => item.freq),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 0.2,
        barPercentage: 1,
        categoryPercentage: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4/3,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: 20,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '時価総額範囲（百万円）',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: '頻度',
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
