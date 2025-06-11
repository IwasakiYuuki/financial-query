'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/theme';

// Plotlyを動的にインポート（SSR対応）
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface HistogramData {
  bin: number;
  freq: number;
  binEnd?: number; // 区間終了値（新形式CSVの場合）
}

interface PlotlyHistogramProps {
  data: HistogramData[];
  title: string;
  unit: string;
  binSize?: number;
  xAxisMin?: number;
  xAxisMax?: number;
}

export default function PlotlyHistogram({ data, title, unit, binSize = 500, xAxisMin, xAxisMax }: PlotlyHistogramProps) {
  const { theme } = useTheme();
  // 90%範囲の自動計算（5%～95%パーセンタイル）
  const calculate90PercentileRange = (data: HistogramData[]) => {
    // 累積度数を計算
    const sortedData = [...data].sort((a, b) => a.bin - b.bin);
    const totalCount = sortedData.reduce((sum, item) => sum + item.freq, 0);
    let cumulative = 0;
    
    const cumulativeData = sortedData.map(item => {
      cumulative += item.freq;
      return {
        bin: item.bin,
        cumulativePercent: (cumulative / totalCount) * 100
      };
    });
    
    // 5%パーセンタイルと95%パーセンタイルを見つける
    const percentile5 = cumulativeData.find(item => item.cumulativePercent >= 5)?.bin ?? sortedData[0].bin;
    const percentile95 = cumulativeData.find(item => item.cumulativePercent >= 95)?.bin ?? sortedData[sortedData.length - 1].bin;
    
    return { min: percentile5, max: percentile95 };
  };

  // データの最小値と最大値を取得
  const minBin = Math.min(...data.map(item => item.bin));
  const maxBin = Math.max(...data.map(item => item.bin));
  
  // 90%範囲を計算
  const autoRange = calculate90PercentileRange(data);
  
  // X軸の範囲を決定（手動指定 > 90%自動範囲 > 全データ範囲の優先順位）
  const calculatedXAxisMin = xAxisMin !== undefined ? xAxisMin : 
    (data.length > 0 ? minBin : Math.floor(minBin / binSize) * binSize);
  const calculatedXAxisMax = xAxisMax !== undefined ? xAxisMax : 
    (data.length > 0 ? Math.ceil((autoRange.max + binSize) / binSize) * binSize : Math.ceil((maxBin + binSize) / binSize) * binSize);

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

  // 累積分布データを計算
  const calculateCumulativeData = (data: HistogramData[]) => {
    const sortedData = [...data].sort((a, b) => a.bin - b.bin);
    const totalCount = sortedData.reduce((sum, item) => sum + item.freq, 0);
    let cumulative = 0;
    
    return sortedData.map(item => {
      cumulative += item.freq;
      const binEnd = item.binEnd ?? (item.bin + binSize);
      return {
        x: binEnd, // 正確な区間終了点（X未満の累積を表現）
        y: (cumulative / totalCount) * 100, // パーセンテージ
        binStart: item.bin, // ホバー用の区間開始値
        binEnd: binEnd // ホバー用の区間終了値
      };
    });
  };

  const cumulativeData = calculateCumulativeData(data);


  // ヒストグラム用のデータを準備
  const plotData = [
    {
      x: data.map(item => {
        const binEnd = item.binEnd ?? (item.bin + binSize);
        return (item.bin + binEnd) / 2; // 区間の中央に配置
      }),
      y: data.map(item => item.freq),
      type: 'bar' as const,
      width: data.map(item => {
        const binEnd = item.binEnd ?? (item.bin + binSize);
        return binEnd - item.bin; // 実際の区間幅を使用
      }),
      marker: {
        color: colors.bar,
        line: {
          color: colors.barBorder,
          width: 1,
        },
      },
      hovertemplate: '<b>区間:</b> %{customdata[0]:,}以上 %{customdata[1]:,}未満<br><b>頻度:</b> %{y:,}件<extra></extra>',
      customdata: data.map(item => {
        const binEnd = item.binEnd ?? (item.bin + binSize);
        return [item.bin, binEnd]; // [開始値, 終了値]の配列
      }),
      hoverlabel: {
        bgcolor: colors.hoverBg,
        bordercolor: colors.hoverBorder,
        font: {
          color: 'white',
          size: 12,
        },
      },
      name: '頻度',
      yaxis: 'y1',
      showlegend: true,
    },
    {
      x: cumulativeData.map(item => item.x),
      y: cumulativeData.map(item => item.y),
      type: 'scatter' as const,
      mode: 'lines' as const,
      line: {
        color: isDark ? 'rgba(251, 191, 36, 1)' : 'rgba(245, 158, 11, 1)', // 黄色系
        width: 2,
      },
      name: '累積分布',
      yaxis: 'y2',
      hovertemplate: '<b>累積分布:</b> %{x:,}未満 %{y:.1f}%<extra></extra>',
      customdata: cumulativeData.map(item => ({ binStart: item.binStart, binEnd: item.binEnd })),
      showlegend: true,
    },
  ];

  const layout = {
    title: {
      text: '', // タイトルを非表示
    },
    xaxis: {
      title: {
        text: `${title} [${unit}]`,
        font: {
          size: 14,
          color: colors.text,
          weight: 600,
        },
        standoff: 15, // タイトルとラベルの間隔を広げる
      },
      tickformat: ',',
      range: [calculatedXAxisMin, calculatedXAxisMax],
      dtick: Math.max(binSize * 2, Math.ceil((calculatedXAxisMax - calculatedXAxisMin) / 10)), // ラベル数を減らして重なりを防ぐ
      tick0: calculatedXAxisMin,
      showgrid: true,
      gridcolor: colors.grid,
      gridwidth: 1,
      zeroline: true, // ゼロラインを表示
      zerolinecolor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
      zerolinewidth: 1,
      tickfont: {
        color: colors.text,
        size: 11,
      },
      tickangle: -45, // ラベルを斜めにして重なりを防ぐ
      tickmode: 'auto',
      nticks: 8, // 最大ティック数を制限
    },
    yaxis: {
      title: {
        text: '頻度',
        font: {
          size: 14,
          color: colors.text,
          weight: 600,
        },
        standoff: 15,
      },
      tickformat: ',',
      showgrid: true,
      gridcolor: colors.grid,
      gridwidth: 1,
      zeroline: false,
      tickfont: {
        color: colors.text,
        size: 11,
      },
      side: 'left',
      fixedrange: true, // Y軸の範囲を固定
    },
    yaxis2: {
      title: {
        text: '累積分布 (%)',
        font: {
          size: 14,
          color: colors.text,
          weight: 600,
        },
        standoff: 15,
      },
      tickformat: '.0f',
      ticksuffix: '%',
      overlaying: 'y',
      side: 'right',
      showgrid: false,
      tickfont: {
        color: colors.text,
        size: 11,
      },
      range: [0, 100],
      dtick: 20, // 20%刻みで表示
      fixedrange: true,
    },
    margin: {
      l: 100, // 左マージンを更に拡大（Y軸ラベル用）
      r: 80,  // 右マージンを拡大（累積分布軸用）
      t: 40,  // 上マージンを調整
      b: 100, // 下マージンを拡大（X軸ラベル回転用）
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    bargap: 0,
    hovermode: 'closest' as const, // ホバー時の動作を改善
    showlegend: true, // 凡例を表示
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      bordercolor: isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.3)',
      borderwidth: 1,
      font: {
        size: 11,
        color: colors.text,
      },
    },
  };

  const config = {
    responsive: true,
    displayModeBar: false,
    // インタラクティブ機能を無効化
    scrollZoom: false,
    doubleClick: false,
    showTips: false,
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