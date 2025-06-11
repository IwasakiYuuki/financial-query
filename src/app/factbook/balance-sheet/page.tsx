'use client';

import { useState, useEffect } from 'react';
import FactSheet from '@/components/FactSheet';
import { HistogramData, loadCSVFromFile } from '@/lib/csvUtils';

export default function BalanceSheetPage() {
  const [totalAssetsData, setTotalAssetsData] = useState<HistogramData[]>([]);
  const [currentLiabilitiesData, setCurrentLiabilitiesData] = useState<HistogramData[]>([]);
  const [longTermDebtData, setLongTermDebtData] = useState<HistogramData[]>([]);
  const [totalDebtData, setTotalDebtData] = useState<HistogramData[]>([]);
  const [stockholdersEquityData, setStockholdersEquityData] = useState<HistogramData[]>([]);
  const [retainedEarningsData, setRetainedEarningsData] = useState<HistogramData[]>([]);
  const [cashData, setCashData] = useState<HistogramData[]>([]);
  const [inventoryData, setInventoryData] = useState<HistogramData[]>([]);
  const [netPpeData, setNetPpeData] = useState<HistogramData[]>([]);
  const [goodwillData, setGoodwillData] = useState<HistogramData[]>([]);
  const [workingCapitalData, setWorkingCapitalData] = useState<HistogramData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          totalAssets, currentLiabilities, longTermDebt, totalDebt, stockholdersEquity,
          retainedEarnings, cash, inventory, netPpe, goodwill, workingCapital
        ] = await Promise.all([
          loadCSVFromFile('/data/total_assets.csv'),
          loadCSVFromFile('/data/current_liabilities.csv'),
          loadCSVFromFile('/data/long_term_debt.csv'),
          loadCSVFromFile('/data/total_debt.csv'),
          loadCSVFromFile('/data/stockholders_equity.csv'),
          loadCSVFromFile('/data/retained_earnings.csv'),
          loadCSVFromFile('/data/cash_and_cash_equivalents.csv'),
          loadCSVFromFile('/data/inventory.csv'),
          loadCSVFromFile('/data/net_ppe.csv'),
          loadCSVFromFile('/data/goodwill.csv'),
          loadCSVFromFile('/data/working_capital.csv'),
        ]);

        setTotalAssetsData(totalAssets);
        setCurrentLiabilitiesData(currentLiabilities);
        setLongTermDebtData(longTermDebt);
        setTotalDebtData(totalDebt);
        setStockholdersEquityData(stockholdersEquity);
        setRetainedEarningsData(retainedEarnings);
        setCashData(cash);
        setInventoryData(inventory);
        setNetPpeData(netPpe);
        setGoodwillData(goodwill);
        setWorkingCapitalData(workingCapital);
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
              <span className="text-financial-600 dark:text-financial-400 font-medium">貸借対照表</span>
            </li>
          </ol>
        </nav>

        {/* ヘッダーセクション */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            貸借対照表（B/S）分析
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            上場企業の貸借対照表項目の分布状況を可視化
          </p>
          <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
            企業の財政状態分析と安定性評価のためのデータ分析
          </p>
        </div>

        {/* データグリッド */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={totalAssetsData}
            title="総資産"
            description="企業が保有する全ての資産の総額分布"
            unit="億円"
            binSize={100000000000}
            scale={100000000}
          />

          <FactSheet
            data={currentLiabilitiesData}
            title="流動負債"
            description="1年以内に支払い期限が到来する負債の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={longTermDebtData}
            title="長期負債"
            description="1年を超える長期的な債務の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={totalDebtData}
            title="総負債"
            description="企業の負債総額の分布"
            unit="億円"
            binSize={20000000000}
            scale={100000000}
          />

          <FactSheet
            data={stockholdersEquityData}
            title="株主資本"
            description="株主の持分に相当する資本の分布"
            unit="億円"
            binSize={20000000000}
            scale={100000000}
          />

          <FactSheet
            data={retainedEarningsData}
            title="利益剰余金"
            description="企業が蓄積してきた利益の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={cashData}
            title="現金及び現金同等物"
            description="企業が保有する現金・預金等の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={inventoryData}
            title="棚卸資産"
            description="在庫として保有している資産の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={netPpeData}
            title="純固定資産"
            description="減価償却後の固定資産の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />

          <FactSheet
            data={goodwillData}
            title="のれん"
            description="M&A等で発生したのれんの分布"
            unit="億円"
            binSize={1000000000}
            scale={100000000}
          />

          <FactSheet
            data={workingCapitalData}
            title="運転資本"
            description="営業活動に必要な運転資金の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
          />
        </div>
      </div>
    </div>
  );
}
