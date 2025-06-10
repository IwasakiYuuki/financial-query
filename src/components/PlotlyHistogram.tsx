'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/theme';

// Plotlyを動的にインポート（SSR対応）
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface HistogramData {
  bin: number;
  freq: number;
}

interface PlotlyHistogramProps {
  data: HistogramData[];
  title: string;
  binSize?: number;
  xAxisMin?: number;
  xAxisMax?: number;
}

export default function PlotlyHistogram({ data, title, binSize = 500, xAxisMin, xAxisMax }: PlotlyHistogramProps) {
  const { theme } = useTheme();
  // データの最小値と最大値を取得
  const minBin = Math.min(...data.map(item => item.bin));
  const maxBin = Math.max(...data.map(item => item.bin));
  
  // X軸の範囲を決定（指定値またはデータの範囲に合わせて調整）
  const calculatedXAxisMin = xAxisMin !== undefined ? xAxisMin : Math.floor(minBin / binSize) * binSize;
  const calculatedXAxisMax = xAxisMax || (Math.ceil((maxBin + binSize) / binSize) * binSize);

  // テーマに応じた色設定
  const isDark = theme === 'dark';
  const colors = {
    bar: isDark ? 'rgba(147, 197, 253, 0.7)' : 'rgba(99, 102, 241, 0.7)',
    barBorder: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(99, 102, 241, 1)',
    hoverBg: isDark ? 'rgba(147, 197, 253, 0.9)' : 'rgba(99, 102, 241, 0.9)',
    hoverBorder: isDark ? 'rgba(147, 197, 253, 1)' : 'rgba(99, 102, 241, 1)',
    text: isDark ? '#e5e7eb' : '#374151',
    grid: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  };

  // ヒストグラム用のデータを準備
  const plotData = [
    {
      x: data.map(item => item.bin),
      y: data.map(item => item.freq),
      type: 'histogram' as const,
      histfunc: 'sum' as const,
      xbins: {
        size: binSize, // ビンサイズ（棒の幅）
        start: calculatedXAxisMin,
        end: calculatedXAxisMax,
      },
      marker: {
        color: colors.bar,
        line: {
          color: colors.barBorder,
          width: 1,
        },
      },
      hoverlabel: {
        bgcolor: colors.hoverBg,
        bordercolor: colors.hoverBorder,
        font: {
          color: 'white',
          size: 14,
        },
      },
      name: '頻度',
    },
  ];

  const layout = {
    title: {
      text: title,
      font: {
        size: 18,
        family: 'Arial, sans-serif',
        color: colors.text,
      },
    },
    xaxis: {
      title: {
        text: '時価総額（百万円）',
        font: {
          size: 14,
          color: colors.text,
        },
      },
      tickformat: ',',
      range: [calculatedXAxisMin, calculatedXAxisMax], // X軸をデータ範囲に合わせる
      dtick: Math.max(binSize * 2, Math.ceil((calculatedXAxisMax - calculatedXAxisMin) / 10)), // X軸のグリッド・ラベル間隔を動的に設定
      tick0: calculatedXAxisMin, // 最初のティックをデータ開始位置に
      showgrid: true,
      gridcolor: colors.grid,
      gridwidth: 1,
      tickfont: {
        color: colors.text,
      },
    },
    yaxis: {
      title: {
        text: '頻度',
        font: {
          size: 14,
          color: colors.text,
        },
      },
      tickformat: ',',
      showgrid: true,
      gridcolor: colors.grid,
      gridwidth: 1,
      tickfont: {
        color: colors.text,
      },
    },
    margin: {
      l: 60,
      r: 30,
      t: 60,
      b: 60,
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    bargap: 0, // ヒストグラムの棒の間隔を0に
    hovermode: 'closest' as const, // ホバー時の動作を設定
  };

  const config = {
    responsive: true,
    displayModeBar: false,
    // ホバー時のインタラクションを有効化
    scrollZoom: false,
    doubleClick: 'reset' as const,
  };

  return (
    <div className="w-full">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}