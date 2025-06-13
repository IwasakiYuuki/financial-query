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
            customFacts={[
              "最大値が45兆円で、平均値の7倍以上の範囲",
              "企業数が最も多いのは300-400億円の範囲",
              "中央値が平均値を大きく下回る",
              "1兆円以上の企業が全体の1割程度"
            ]}
            customFindings={[
              "ロングテールで高い売上高の企業が市場を牽引",
              "平均的な売上総利益率は20%程度（総利益より）",
              "最大値45兆円は世界でも20位に入る規模",
              "中小企業が売上の約3割を占める（業界の差あり）"
            ]}
            customReferences={[
              "[内部] 総利益",
              '[外部] <a href="https://jp.tradingview.com/markets/world-stocks/worlds-highest-revenue/" class="text-blue-600 hover:text-blue-800 underline">世界の株式 売上高上位 - TradingView</a>',
              "[外部] <a href='https://www.meti.go.jp/statistics/tyo/syokozi/result-2/h2c6kfaj.html' class='text-blue-600 hover:text-blue-800 underline'>商工業実態基本調査 - 経済産業省</a>"
            ]}
          />

          <FactSheet
            data={grossProfitData}
            title="総利益"
            description="売上高から売上原価を差し引いた利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
            customFacts={[
              "最小値-2800億円で総利益マイナスの企業が存在",
              "中央値200億円に対し平均値1366億円と高い",
              "最大値10兆円超の極端に高い企業が存在",
              "300億円までで全体の約半数を占める"
            ]}
            customFindings={[
              "総利益率の企業間格差が大きく業界特性が顕著",
              "製造業と小売業で総利益率に大きな差",
              "赤字企業は売上原価が売上高を上回る構造",
              "上位企業の総利益は中小企業の数百倍規模"
            ]}
            customReferences={[
              "[内部] 総売上高",
              "[外部] <a href='https://www.meti.go.jp/statistics/tyo/kougyo/result-2.html' class='text-blue-600 hover:text-blue-800 underline'>工業統計調査 - 経済産業省</a>",
              "[外部] <a href='https://www.nta.go.jp/publication/statistics/kokuzeicho/kaishahyohon/2022/2022.htm' class='text-blue-600 hover:text-blue-800 underline'>会社標本調査 - 国税庁</a>"
            ]}
          />

          <FactSheet
            data={operatingIncomeData}
            title="営業利益"
            description="本業の営業活動による利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
            customFacts={[
              "0億円未満の企業が全体の約5%を占める",
              "最小値-5300億円から最大値5兆円超と幅広い",
              "0-100億円付近に企業数のピークが集中",
              "1700億円を越えるのは全体の上位5%のみ"
            ]}
            customFindings={[
              "本業の収益力で企業の競争力が明確に分かれる",
              "営業利益率10%以上が優良企業の目安",
              "赤字企業は事業モデルの見直しが必要",
              "業界平均営業利益率は3-5%程度"
            ]}
            customReferences={[
              "[内部] 総利益、EBITDA",
              "[外部] <a href='https://www.tsr-net.co.jp/news/analysis/' class='text-blue-600 hover:text-blue-800 underline'>企業分析レポート - 東京商工リサーチ</a>",
              "[外部] <a href='https://www.mizuho-rt.co.jp/publication/industry/' class='text-blue-600 hover:text-blue-800 underline'>業界レポート - みずほリサーチ&テクノロジーズ</a>"
            ]}
          />

          <FactSheet
            data={pretaxIncomeData}
            title="税引前利益"
            description="法人税等を支払う前の利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
            customFacts={[
              "0億円未満の企業が全体の約5%を占める",
              "最大値約7兆円、最小値-8700億円と幅広い",
              "平均値456億円が中央値を大きく上回る右歪み",
              "0-100億円付近に企業数のピークが集中"
            ]}
            customFindings={[
              "営業外収益で赤字を補填する企業が多数",
              "金融収益や為替差益の影響で営業利益より改善",
              "税引前段階で最終的な収益力が判明",
              "投資活動の成果が税引前利益に反映"
            ]}
            customReferences={[
              "[内部] 営業利益、純利益",
              "[外部] <a href='https://www.jpx.co.jp/listing/stocks/new/financial-data/' class='text-blue-600 hover:text-blue-800 underline'>財務データ - 日本取引所グループ</a>",
              "[外部] <a href='https://disclosure.edinet-fsa.go.jp/' class='text-blue-600 hover:text-blue-800 underline'>EDINET - 金融庁</a>"
            ]}
          />

          <FactSheet
            data={netIncomeData}
            title="純利益"
            description="全ての収益・費用を差し引いた最終利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
            customFacts={[
              "6割以上の企業が100億円未満の純利益",
              "最小値-1兆円超で大きな純損失の企業が存在",
              "平均値307億円が中央値を上回る右歪み分布"
            ]}
            customFindings={[
              "税負担と特別損益で税引前利益から大きく変動",
              "ROE計算の分子となる重要な最終収益指標",
              "配当政策の原資となる利益水準",
              "純利益率3%以上が一般的な収益性目安"
            ]}
            customReferences={[
              "[内部] 税引前利益、希薄化後EPS",
              "[外部] <a href='https://www.jcaa.or.jp/library/statistics/' class='text-blue-600 hover:text-blue-800 underline'>公認会計士統計 - 日本公認会計士協会</a>",
              "[外部] <a href='https://www.tdb.co.jp/report/watching/' class='text-blue-600 hover:text-blue-800 underline'>企業分析 - 帝国データバンク</a>"
            ]}
          />

          <FactSheet
            data={ebitdaData}
            title="EBITDA"
            description="減価償却前営業利益の分布"
            unit="億円"
            binSize={10000000000}
            xAxisMin={-30000000000}
            scale={100000000}
            customFacts={[
              "4割以上の企業が100億円未満のEBITDA",
              "平均値748億円が中央値100億円を大きく上回る",
              "最小値-3600億円でマイナスEBITDAの企業も存在"
            ]}
            customFindings={[
              "国際比較やM&A評価で重要な指標",
              "EV/EBITDA倍率での企業評価に使用",
              "減価償却の影響を排除した実質的収益力",
              "営業利益より高く出るため収益性評価に適用"
            ]}
            customReferences={[
              "[内部] 営業利益、総利益",
              "[外部] <a href='https://www.pwc.com/jp/ja/knowledge/thoughtleadership/valuationhub.html' class='text-blue-600 hover:text-blue-800 underline'>企業価値評価 - PwC</a>",
              "[外部] <a href='https://www2.deloitte.com/jp/ja/pages/strategy-operations/articles/ma/ma-insights.html' class='text-blue-600 hover:text-blue-800 underline'>M&A分析 - デロイト</a>"
            ]}
          />

          <FactSheet
            data={dilutedEpsData}
            title="希薄化後EPS"
            description="1株あたり利益（希薄化後）の分布"
            unit="円"
            binSize={10}
            scale={1}
            customFacts={[
              "80-90円の区間が最も多い",
              "中央値110円に対し平均値158円と右歪み分布",
              "上位5%の企業は500円以上の高いEPSを持つ",
              "下位7%の企業は0円未満のEPSを持つ"
            ]}
            customFindings={[
              "PER計算の分母となる重要な投資指標",
              "配当性向算出で配当政策の評価に使用",
              "希薄化調整で新株発行等の影響を考慮",
              "EPS成長率で企業の成長性を測定可能"
            ]}
            customReferences={[
              "[内部] 純利益",
              "[外部] <a href='https://www.bloomberg.co.jp/markets/stocks' class='text-blue-600 hover:text-blue-800 underline'>株式市場データ - ブルームバーグ</a>",
              "[外部] <a href='https://www.nikkei.com/markets/kabu/nidxprice/' class='text-blue-600 hover:text-blue-800 underline'>株価情報 - 日本経済新聞</a>"
            ]}
          />
        </div>
      </div>
    </div>
  );
}
