'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/theme';

// Plotlyを動的にインポート（SSR対応）
const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-5 h-5 border-2 border-financial-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-300 font-medium">グラフを読み込み中...</span>
        </div>
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-financial-400 to-financial-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
});

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
  const [isLoading, setIsLoading] = useState(true);
  
  // ビンの実際の幅を計算（データから自動検出）
  const calculateActualBinWidth = (data: HistogramData[]) => {
    if (data.length === 0) return binSize;
    
    // データが区間終了値を持っている場合はそれを使用
    if (data[0].binEnd !== undefined) {
      const widths = data.map(item => item.binEnd! - item.bin).filter(w => !isNaN(w) && w > 0);
      
      
      if (widths.length > 0) {
        return Math.min(...widths);
      }
    }
    
    // binEndがない場合は、連続するbinの差から推定
    if (data.length > 1) {
      const sortedData = [...data].sort((a, b) => a.bin - b.bin);
      const diffs = [];
      for (let i = 1; i < sortedData.length; i++) {
        diffs.push(sortedData[i].bin - sortedData[i-1].bin);
      }
      if (diffs.length > 0) {
        return Math.min(...diffs);
      }
    }
    
    return binSize;
  };

  const actualBinWidth = calculateActualBinWidth(data);
  
  
  // 90%範囲の自動計算（5%～95%パーセンタイル）
  // 集約されたデータではなく、個々のビン区間を使って正確なパーセンタイル計算
  const calculate90PercentileRange = (data: HistogramData[]) => {
    // 全データポイントを展開（各ビンの区間内で均等分布と仮定）
    const expandedValues: number[] = [];
    
    for (const item of data) {
      // 各ビンの中央値を頻度分だけ追加
      const binCenter = item.binEnd ? (item.bin + item.binEnd) / 2 : item.bin;
      for (let i = 0; i < item.freq; i++) {
        expandedValues.push(binCenter);
      }
    }
    
    // ソート
    expandedValues.sort((a, b) => a - b);
    
    const totalCount = expandedValues.length;
    
    // 5%パーセンタイルと95%パーセンタイルのインデックス計算
    const index5 = Math.floor(totalCount * 0.05);
    const index95 = Math.floor(totalCount * 0.95);
    
    const percentile5 = expandedValues[index5] ?? expandedValues[0];
    const percentile95 = expandedValues[index95] ?? expandedValues[totalCount - 1];
    
    
    return { min: percentile5, max: percentile95 };
  };

  // データの最小値と最大値を取得
  const minBin = Math.min(...data.map(item => item.bin));
  const maxBin = Math.max(...data.map(item => item.bin));
  
  // 90%範囲を計算
  const autoRange = calculate90PercentileRange(data);
  
  // X軸の範囲を決定（手動指定がない場合は90%範囲を使用）
  const tempXAxisMin = xAxisMin !== undefined ? xAxisMin : 
    (data.length > 0 ? Math.floor(autoRange.min / actualBinWidth) * actualBinWidth : Math.floor(minBin / actualBinWidth) * actualBinWidth);
  const tempXAxisMax = xAxisMax !== undefined ? xAxisMax : 
    (data.length > 0 ? Math.ceil((autoRange.max + actualBinWidth) / actualBinWidth) * actualBinWidth : Math.ceil((maxBin + actualBinWidth) / actualBinWidth) * actualBinWidth);
  
  // 必ずMin < Maxになるように調整
  const calculatedXAxisMin = Math.min(tempXAxisMin, tempXAxisMax);
  const calculatedXAxisMax = Math.max(tempXAxisMin, tempXAxisMax);


  // テーマに応じた色設定
  const isDark = theme === 'dark';
  const colors = {
    bar: isDark ? 'rgba(148, 163, 184, 0.8)' : 'rgba(100, 116, 139, 0.8)', // slate系メイン
    barBorder: isDark ? 'rgba(203, 213, 225, 1)' : 'rgba(71, 85, 105, 1)', // slate系境界
    hoverBg: isDark ? 'rgba(148, 163, 184, 0.95)' : 'rgba(100, 116, 139, 0.95)',
    hoverBorder: isDark ? 'rgba(203, 213, 225, 1)' : 'rgba(71, 85, 105, 1)',
    text: isDark ? '#e5e7eb' : '#374151',
    grid: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  };

  // 累積分布データを計算（連続的な線を描画するため、空白区間も補間）
  const calculateCumulativeData = (data: HistogramData[], xMin: number, xMax: number, binWidth: number) => {
    const sortedData = [...data].sort((a, b) => a.bin - b.bin);
    const totalCount = sortedData.reduce((sum, item) => sum + item.freq, 0);
    
    // データをマップに変換（高速検索用）
    const dataMap = new Map<number, number>();
    for (const item of sortedData) {
      dataMap.set(item.bin, item.freq);
    }
    
    // X軸の表示範囲内で連続的な累積分布を作成
    const result = [];
    let cumulative = 0;
    
    // 最小値から最大値まで、ビン幅刻みで累積値を計算
    for (let x = Math.floor(xMin / binWidth) * binWidth; x <= xMax; x += binWidth) {
      const freq = dataMap.get(x) || 0;
      cumulative += freq;
      
      result.push({
        x: x + binWidth, // 区間終了点
        y: (cumulative / totalCount) * 100,
        binStart: x,
        binEnd: x + binWidth
      });
    }
    
    return result;
  };

  const cumulativeData = calculateCumulativeData(data, calculatedXAxisMin, calculatedXAxisMax, actualBinWidth);

  // ヒストグラム用のデータを準備（必ずソート）
  const sortedData = [...data].sort((a, b) => a.bin - b.bin);
  
  const plotData = [
    {
      x: sortedData.map(item => {
        const binEnd = item.binEnd ?? (item.bin + actualBinWidth);
        return (item.bin + binEnd) / 2; // 区間の中央に配置
      }),
      y: sortedData.map(item => item.freq),
      type: 'bar' as const,
      width: actualBinWidth * 0.95, // 実際のビン幅の95%でバーを表示（わずかな隙間）
      marker: {
        color: colors.bar,
        line: {
          color: colors.barBorder,
          width: 1,
        },
      },
      hovertemplate: '<b>区間:</b> %{customdata[0]:,}以上 %{customdata[1]:,}未満<br><b>頻度:</b> %{y:,}件<extra></extra>',
      customdata: sortedData.map(item => {
        const binEnd = item.binEnd ?? (item.bin + actualBinWidth);
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
        color: isDark ? 'rgba(251, 146, 60, 1)' : 'rgba(234, 88, 12, 1)', // オレンジ系
        width: 2,
      },
      name: '累積分布',
      yaxis: 'y2',
      hovertemplate: '<b>累積分布:</b> %{x:,}未満 %{y:.1f}%<extra></extra>',
      customdata: cumulativeData.map(item => [item.binStart, item.binEnd]),
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
      dtick: Math.max(actualBinWidth * 2, Math.ceil((calculatedXAxisMax - calculatedXAxisMin) / 10)), // ラベル数を減らして重なりを防ぐ
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
      tickmode: 'auto' as const,
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
      side: 'left' as const,
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
      overlaying: 'y' as const,
      side: 'right' as const,
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
    doubleClick: 'reset' as const,
    showTips: false,
  };

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-5 h-5 border-2 border-financial-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300 font-medium">グラフを描画中...</span>
            </div>
            <div className="w-48 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-financial-400 to-financial-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '400px' }}
        onInitialized={() => setIsLoading(false)}
        onUpdate={() => setIsLoading(false)}
      />
    </div>
  );
}
