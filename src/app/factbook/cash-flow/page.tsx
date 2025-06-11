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
              <span className="text-financial-600 dark:text-financial-400 font-medium">キャッシュフロー</span>
            </li>
          </ol>
        </nav>

        {/* ヘッダーセクション */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            キャッシュフロー計算書（C/F）分析
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            上場企業のキャッシュフロー項目の分布状況を可視化
          </p>
          <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
            企業の資金繰り分析と現金創出力評価のためのデータ分析
          </p>
        </div>

        {/* データグリッド */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={operatingCfData}
            title="営業キャッシュフロー"
            description="本業の営業活動から生み出されるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={investingCfData}
            title="投資キャッシュフロー"
            description="設備投資や投資活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={financingCfData}
            title="財務キャッシュフロー"
            description="資金調達・返済活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={freeCashFlowData}
            title="フリーキャッシュフロー"
            description="企業が自由に使える現金創出力の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={capexData}
            title="設備投資"
            description="固定資産への投資額の分布"
            unit="億円"
            binSize={2000000000}
            scale={100000000}
          />

          <FactSheet
            data={dividendsPaidData}
            title="配当金支払"
            description="株主への配当金支払額の分布"
            unit="億円"
            binSize={1000000000}
            scale={100000000}
          />
        </div>
      </div>
    </div>
  );
}
