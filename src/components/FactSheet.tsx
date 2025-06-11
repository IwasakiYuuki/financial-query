'use client';

import React from 'react';
import PlotlyHistogram from './PlotlyHistogram';

interface HistogramData {
  bin: number;
  freq: number;
  binEnd?: number; // 区間終了値（新形式CSVの場合）
}

interface FactSheetProps {
  data: HistogramData[];
  title: string;
  description: string;
  unit: string;
  binSize: number;
  xAxisMin?: number;
  xAxisMax?: number;
  scale?: number; // 単位変換のスケール（例：1億円なら100000000）
}

export default function FactSheet({ data, title, description, unit, binSize, xAxisMin, xAxisMax, scale = 1 }: FactSheetProps) {
  // データをスケール変換
  const scaledData = data.map(item => ({
    bin: item.bin / scale,
    freq: item.freq,
    binEnd: item.binEnd ? item.binEnd / scale : undefined
  }));

  // 統計量の計算（元のデータで計算してからスケール変換）
  const calculateStats = (data: HistogramData[]) => {
    const totalCount = data.reduce((sum, item) => sum + item.freq, 0);
    const weightedSum = data.reduce((sum, item) => sum + (item.bin * item.freq), 0);
    const mean = weightedSum / totalCount;
    
    const min = data[0]?.bin || 0;
    const max = data[data.length - 1]?.bin || 0;
    
    // 中央値の近似計算
    const medianIndex = Math.floor(totalCount / 2);
    let cumulative = 0;
    let median = 0;
    for (const item of data) {
      cumulative += item.freq;
      if (cumulative >= medianIndex) {
        median = item.bin;
        break;
      }
    }

    return {
      totalCount,
      mean: Math.round(mean),
      median,
      min,
      max,
      range: max - min,
    };
  };

  const rawStats = calculateStats(data);
  
  // 統計量をスケール変換
  const stats = {
    totalCount: rawStats.totalCount,
    mean: rawStats.mean / scale,
    median: rawStats.median / scale,
    min: rawStats.min / scale,
    max: rawStats.max / scale,
    range: rawStats.range / scale
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      {/* 装飾的なトップボーダー */}
      <div className="h-0.5 bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-400"></div>
      
      {/* ヘッダー */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-5 border-b border-gray-100 dark:border-gray-600">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium px-2 py-1 rounded border dark:border-slate-500">
                最新
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString('ja-JP')}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 統計量サマリー */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">総数</p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{stats.totalCount.toLocaleString()}</p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-300 mb-1">平均値</p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{stats.mean.toLocaleString()}</p>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900 border border-emerald-200 dark:border-emerald-700 p-3 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-300 mb-1">中央値</p>
            <p className="text-lg font-bold text-emerald-900 dark:text-emerald-100">{stats.median.toLocaleString()}</p>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 p-3 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800 transition-colors">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-300 mb-1">最小値</p>
            <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{stats.min.toLocaleString()}</p>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-900 border border-rose-200 dark:border-rose-700 p-3 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-800 transition-colors">
            <p className="text-xs font-medium text-rose-600 dark:text-rose-300 mb-1">最大値</p>
            <p className="text-lg font-bold text-rose-900 dark:text-rose-100">{stats.max.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">レンジ</p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{stats.range.toLocaleString()}</p>
          </div>
        </div>

        {/* グラフ */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <PlotlyHistogram 
            data={scaledData} 
            title={title} 
            unit={unit}
            binSize={binSize / scale}
            xAxisMin={xAxisMin ? xAxisMin / scale : undefined}
            xAxisMax={xAxisMax ? xAxisMax / scale : undefined}
          />
        </div>

        {/* Facts, Findings, References */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Facts */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
              <div className="w-1 h-4 bg-slate-500 dark:bg-slate-400 rounded-full mr-2"></div>
              Facts
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>データ数: {stats.totalCount.toLocaleString()}件</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>範囲: {stats.min.toLocaleString()}-{stats.max.toLocaleString()}{unit}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>分布: 右歪み分布</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>ビン: {binSize.toLocaleString()}{unit}単位</span>
              </li>
            </ul>
          </div>

          {/* Findings */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
              <div className="w-1 h-4 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></div>
              Findings
            </h3>
            <ul className="space-y-2 text-xs text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>低水準の企業が最多</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>平均値 &gt; 中央値（右歪み）</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>ロングテール分布</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>幅広い分布を示す</span>
              </li>
            </ul>
          </div>

          {/* References */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
              <div className="w-1 h-4 bg-gray-500 dark:bg-gray-400 rounded-full mr-2"></div>
              References
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">データソース</div>
                <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  内部分析基盤
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">更新頻度</div>
                <div className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  四半期毎
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}