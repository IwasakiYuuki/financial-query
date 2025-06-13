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
  customFacts?: string[]; // カスタムFactsリスト
  customFindings?: string[]; // カスタムFindingsリスト
  customReferences?: string[]; // カスタムReferencesリスト
}

export default function FactSheet({ data, title, description, unit, binSize, xAxisMin, xAxisMax, scale = 1, customFacts, customFindings, customReferences }: FactSheetProps) {
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden mb-8">
      {/* 装飾的なトップボーダー */}
      <div className="h-1 bg-gradient-to-r from-financial-400 via-financial-500 to-financial-600 dark:from-financial-500 dark:via-financial-400 dark:to-financial-500"></div>
      
      {/* ヘッダー */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-5 border-b border-gray-100 dark:border-gray-600">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium px-2 py-1 rounded border dark:border-slate-500">
                2025年6月更新
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 統計量サマリー */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">総数</p>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalCount.toLocaleString()}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:ml-1">社</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">平均値</p>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-financial-600 dark:text-financial-400">{stats.mean.toLocaleString()}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:ml-1">{unit}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">中央値</p>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.median.toLocaleString()}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:ml-1">{unit}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">最小値</p>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.min.toLocaleString()}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:ml-1">{unit}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">最大値</p>
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.max.toLocaleString()}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400 sm:ml-1">{unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* グラフ */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 min-h-[400px]">
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
              {customFacts ? (
                customFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{fact}</span>
                  </li>
                ))
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>

          {/* Findings */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
              <div className="w-1 h-4 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></div>
              Findings
            </h3>
            <ul className="space-y-2 text-xs text-blue-700 dark:text-blue-300">
              {customFindings ? (
                customFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{finding}</span>
                  </li>
                ))
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>

          {/* References */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
              <div className="w-1 h-4 bg-gray-500 dark:bg-gray-400 rounded-full mr-2"></div>
              References
            </h3>
            {customReferences ? (
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                {customReferences.map((reference, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span dangerouslySetInnerHTML={{ __html: reference }}></span>
                  </li>
                ))}
              </ul>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      
      {/* 底部の装飾ボーダー */}
      <div className="h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600"></div>
    </div>
  );
}