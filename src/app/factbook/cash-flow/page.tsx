'use client';

import { useState, useEffect } from 'react';
import FactSheet from '@/components/FactSheet';
import { HistogramData, loadCSVFromFile } from '@/lib/csvUtils';

export default function CashFlowPage() {
  const [operatingCfData, setOperatingCfData] = useState<HistogramData[]>([]);
  const [investingCfData, setInvestingCfData] = useState<HistogramData[]>([]);
  const [financingCfData, setFinancingCfData] = useState<HistogramData[]>([]);
  const [freeCashFlowData, setFreeCashFlowData] = useState<HistogramData[]>([]);
  const [capexData, setCapexData] = useState<HistogramData[]>([]);
  const [dividendsPaidData, setDividendsPaidData] = useState<HistogramData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [operatingCf, investingCf, financingCf, freeCashFlow, capex, dividendsPaid] = await Promise.all([
          loadCSVFromFile('/data/operating_cash_flow.csv'),
          loadCSVFromFile('/data/investing_cash_flow.csv'),
          loadCSVFromFile('/data/financing_cash_flow.csv'),
          loadCSVFromFile('/data/free_cash_flow.csv'),
          loadCSVFromFile('/data/capital_expenditure.csv'),
          loadCSVFromFile('/data/cash_dividends_paid.csv'),
        ]);

        setOperatingCfData(operatingCf);
        setInvestingCfData(investingCf);
        setFinancingCfData(financingCf);
        setFreeCashFlowData(freeCashFlow);
        setCapexData(capex);
        setDividendsPaidData(dividendsPaid);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">キャッシュフロー計算書（C/F）分析</h1>
          <p className="text-gray-600">上場企業のキャッシュフロー項目の分布状況を可視化</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={operatingCfData}
            title="営業キャッシュフロー"
            description="本業の営業活動から生み出されるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-200000000000}
            xAxisMax={200000000000}
            scale={100000000}
          />

          <FactSheet
            data={investingCfData}
            title="投資キャッシュフロー"
            description="設備投資や投資活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-200000000000}
            xAxisMax={200000000000}
            scale={100000000}
          />

          <FactSheet
            data={financingCfData}
            title="財務キャッシュフロー"
            description="資金調達・返済活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={freeCashFlowData}
            title="フリーキャッシュフロー"
            description="企業が自由に使える現金創出力の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={capexData}
            title="設備投資"
            description="固定資産への投資額の分布"
            unit="億円"
            binSize={2000000000}
            xAxisMin={-90000000000}
            xAxisMax={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={dividendsPaidData}
            title="配当金支払"
            description="株主への配当金支払額の分布"
            unit="億円"
            binSize={1000000000}
            xAxisMin={-39000000000}
            xAxisMax={1000000000}
            scale={100000000}
          />
        </div>
      </div>
    </div>
  );
}
