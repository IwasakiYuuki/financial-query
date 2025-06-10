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
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-gray-600">データを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">貸借対照表（B/S）分析</h1>
          <p className="text-gray-600">上場企業の貸借対照表項目の分布状況を可視化</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <FactSheet
            data={totalAssetsData}
            title="総資産"
            description="企業が保有する全ての資産の総額分布"
            unit="億円"
            binSize={100000000000}
            xAxisMax={1000000000000}
            scale={100000000}
          />

          <FactSheet
            data={currentLiabilitiesData}
            title="流動負債"
            description="1年以内に支払い期限が到来する負債の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={400000000000}
            scale={100000000}
          />

          <FactSheet
            data={longTermDebtData}
            title="長期負債"
            description="1年を超える長期的な債務の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={500000000000}
            scale={100000000}
          />

          <FactSheet
            data={totalDebtData}
            title="総負債"
            description="企業の負債総額の分布"
            unit="億円"
            binSize={20000000000}
            xAxisMax={800000000000}
            scale={100000000}
          />

          <FactSheet
            data={stockholdersEquityData}
            title="株主資本"
            description="株主の持分に相当する資本の分布"
            unit="億円"
            binSize={20000000000}
            xAxisMax={600000000000}
            scale={100000000}
          />

          <FactSheet
            data={retainedEarningsData}
            title="利益剰余金"
            description="企業が蓄積してきた利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={400000000000}
            scale={100000000}
          />

          <FactSheet
            data={cashData}
            title="現金及び現金同等物"
            description="企業が保有する現金・預金等の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />

          <FactSheet
            data={inventoryData}
            title="棚卸資産"
            description="在庫として保有している資産の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={200000000000}
            scale={100000000}
          />

          <FactSheet
            data={netPpeData}
            title="純固定資産"
            description="減価償却後の固定資産の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMax={600000000000}
            scale={100000000}
          />

          <FactSheet
            data={goodwillData}
            title="のれん"
            description="M&A等で発生したのれんの分布"
            unit="億円"
            binSize={1000000000}
            xAxisMax={50000000000}
            scale={100000000}
          />

          <FactSheet
            data={workingCapitalData}
            title="運転資本"
            description="営業活動に必要な運転資金の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-300000000000}
            xAxisMax={300000000000}
            scale={100000000}
          />
        </div>
      </div>
    </div>
  );
}
