'use client';

import { useState, useEffect } from 'react';
import FactSheet from '@/components/FactSheet';
import { HistogramData, loadCSVFromFile } from '@/lib/csvUtils';

export default function IncomeStatementPage() {
  const [revenueData, setRevenueData] = useState<HistogramData[]>([]);
  const [grossProfitData, setGrossProfitData] = useState<HistogramData[]>([]);
  const [operatingIncomeData, setOperatingIncomeData] = useState<HistogramData[]>([]);
  const [pretaxIncomeData, setPretaxIncomeData] = useState<HistogramData[]>([]);
  const [netIncomeData, setNetIncomeData] = useState<HistogramData[]>([]);
  const [ebitdaData, setEbitdaData] = useState<HistogramData[]>([]);
  const [dilutedEpsData, setDilutedEpsData] = useState<HistogramData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [revenue, grossProfit, operatingIncome, pretaxIncome, netIncome, ebitda, dilutedEps] = await Promise.all([
          loadCSVFromFile('/data/total_revenue.csv'),
          loadCSVFromFile('/data/gross_profit.csv'),
          loadCSVFromFile('/data/operating_income.csv'),
          loadCSVFromFile('/data/pretax_income.csv'),
          loadCSVFromFile('/data/net_income.csv'),
          loadCSVFromFile('/data/ebitda.csv'),
          loadCSVFromFile('/data/diluted_eps.csv'),
        ]);

        setRevenueData(revenue);
        setGrossProfitData(grossProfit);
        setOperatingIncomeData(operatingIncome);
        setPretaxIncomeData(pretaxIncome);
        setNetIncomeData(netIncome);
        setEbitdaData(ebitda);
        setDilutedEpsData(dilutedEps);
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex items-center justify-center">
          <div className="text-gray-600 dark:text-gray-300">データを読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* パンくずリスト */}
        <nav className="mb-8 sm:mb-12" aria-label="パンくず">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <a href="/factbook" className="hover:text-financial-600 dark:hover:text-financial-400 transition-colors">
                ファクトブック
              </a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <a href="/factbook/corporate" className="hover:text-financial-600 dark:hover:text-financial-400 transition-colors">
                企業情報
              </a>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-financial-600 dark:text-financial-400 font-medium">損益計算書</span>
            </li>
          </ol>
        </nav>

        {/* ヘッダーセクション */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            損益計算書（P/L）分析
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            上場企業の損益計算書項目の分布状況を可視化
          </p>
          <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
            企業の収益性分析と業界比較のためのデータ分析
          </p>
        </div>

        {/* データグリッド */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={revenueData}
            title="総売上高"
            description="企業の営業活動による総収入額の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={0}
            scale={100000000}
          />

          <FactSheet
            data={grossProfitData}
            title="総利益"
            description="売上高から売上原価を差し引いた利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
          />

          <FactSheet
            data={operatingIncomeData}
            title="営業利益"
            description="本業の営業活動による利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
          />

          <FactSheet
            data={pretaxIncomeData}
            title="税引前利益"
            description="法人税等を支払う前の利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
          />

          <FactSheet
            data={netIncomeData}
            title="純利益"
            description="全ての収益・費用を差し引いた最終利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
          />

          <FactSheet
            data={ebitdaData}
            title="EBITDA"
            description="減価償却前営業利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
          />

          <FactSheet
            data={dilutedEpsData}
            title="希薄化後EPS"
            description="1株あたり利益（希薄化後）の分布"
            unit="円"
            binSize={10}
            scale={1}
          />
        </div>
      </div>
    </div>
  );
}
