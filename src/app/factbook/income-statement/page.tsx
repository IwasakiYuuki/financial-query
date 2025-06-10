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
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-gray-600">データを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">損益計算書（P/L）分析</h1>
          <p className="text-gray-600">上場企業の損益計算書項目の分布状況を可視化</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={revenueData}
            title="総売上高"
            description="企業の営業活動による総収入額の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={500000000000}
            scale={100000000}
          />

          <FactSheet
            data={grossProfitData}
            title="総利益"
            description="売上高から売上原価を差し引いた利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-10000000000}
            xAxisMax={200000000000}
            scale={100000000}
          />

          <FactSheet
            data={operatingIncomeData}
            title="営業利益"
            description="本業の営業活動による利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={pretaxIncomeData}
            title="税引前利益"
            description="法人税等を支払う前の利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={netIncomeData}
            title="純利益"
            description="全ての収益・費用を差し引いた最終利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={ebitdaData}
            title="EBITDA"
            description="減価償却前営業利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={dilutedEpsData}
            title="希薄化後EPS"
            description="1株あたり利益（希薄化後）の分布"
            unit="円"
            binSize={10}
            xAxisMin={-500}
            xAxisMax={500}
            scale={1}
          />
        </div>
      </div>
    </div>
  );
}
