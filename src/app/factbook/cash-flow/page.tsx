'use client';

import { FactSheet } from '@/components';

export default function CashFlowPage() {

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
            columnName="operating_cash_flow"
            title="営業キャッシュフロー"
            description="本業の営業活動から生み出されるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "中央値0億円で半数の企業がキャッシュ不足",
              "平均値676億円で中央値を大きく上回る",
              "最大値1.3兆円、最小値-9850億円と幅広い",
              "0付近に企業数が集中している"
            ]}
            customFindings={[
              "企業の現金创出力を表す最重要指標",
              "負の営業キャッシュフローは事業の持続性にリスク",
              "営業利益がプラスでも営業キャッシュフローがマイナスの企業が存在",
              "売上高営業キャッシュフロー率は業界平均で約3-8%"
            ]}
            customReferences={[
              "[内部] 営業利益、フリーキャッシュフロー",
              "[外部] <a href='https://www.boj.or.jp/statistics/tk/tokei_1.htm' class='text-blue-600 hover:text-blue-800 underline'>資金循環統計 - 日本銀行</a>",
              "[外部] <a href='https://www.mof.go.jp/pri/publication/financial_review/' class='text-blue-600 hover:text-blue-800 underline'>キャッシュフロー研究 - 財務省</a>"
            ]}
          />

          <FactSheet
            columnName="investing_cash_flow"
            title="投資キャッシュフロー"
            description="設備投資や投資活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "中央値-100億円で大半の企業が投資活動",
              "平均値-403億円で積極的な投資を実施",
              "最大値935億円、最小値-1.07兆円と幅広い",
              "マイナスが正常で設備投資の結果"
            ]}
            customFindings={[
              "投資キャッシュフローは通常マイナスが正常",
              "設備投資、M&A、有価証券売買が主要要素",
              "プラスの場合は資産売却や投資回収を意味",
              "投資キャッシュフロー率は負の値が成長への投資姿勢を表現"
            ]}
            customReferences={[
              "[内部] 設備投資、フリーキャッシュフロー",
              "[外部] <a href='https://www.development-bank.jp/research/economics/' class='text-blue-600 hover:text-blue-800 underline'>設備投資調査 - 日本政策投資銀行</a>",
              "[外部] <a href='https://www.recof.co.jp/research/mastatistics/' class='text-blue-600 hover:text-blue-800 underline'>M&A統計 - レコフ</a>"
            ]}
          />

          <FactSheet
            columnName="financing_cash_flow"
            title="財務キャッシュフロー"
            description="資金調達・返済活動によるキャッシュフローの分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "中央値-100億円で大半の企業が資金流出",
              "平均値-196億円で配当や借入返済が主要",
              "最大値2730億円、最小値-2470億円と中程度の範囲",
              "0付近に企業数が集中している"
            ]}
            customFindings={[
              "借入返済、配当支払、資本調達のバランスを表現",
              "マイナスはネットで資金流出を意味",
              "プラスは新規借入や増資による資金調達",
              "成熟企業は通常マイナスでキャッシュ配分を実施"
            ]}
            customReferences={[
              "[内部] 配当金支払、長期負債",
              "[外部] <a href='https://www.jsda.or.jp/shiryoshitsu/toukei/' class='text-blue-600 hover:text-blue-800 underline'>証券統計 - 日本証券業協会</a>",
              "[外部] <a href='https://www.zenginkyo.or.jp/stats/' class='text-blue-600 hover:text-blue-800 underline'>金融統計 - 全国銀行協会</a>"
            ]}
          />

          <FactSheet
            columnName="free_cash_flow"
            title="フリーキャッシュフロー"
            description="企業が自由に使える現金創出力の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "中央値0億円で半数の企業がフリーキャッシュフロー不足",
              "平均値363億円で中央値を大きく上回る",
              "最大値1.3兆円、最小値-1.03兆円と幅広い",
              "0付近に企業数のピークが集中"
            ]}
            customFindings={[
              "営業キャッシュフローから設備投資を差し引いた残高",
              "企業の本来的なキャッシュ創出力を表す重要指標",
              "プラスのフリーキャッシュフローは配当や借入返済の原資",
              "DCF法での企業価値評価の基礎となる指標"
            ]}
            customReferences={[
              "[内部] 営業キャッシュフロー、設備投資",
              "[外部] <a href='https://www.pwc.com/jp/ja/knowledge/thoughtleadership/valuationhub.html' class='text-blue-600 hover:text-blue-800 underline'>企業価値評価 - PwC</a>",
              "[外部] <a href='https://www.cfo.jp/research/' class='text-blue-600 hover:text-blue-800 underline'>CFO調査 - CFOフォーラム</a>"
            ]}
          />

          <FactSheet
            columnName="capital_expenditure"
            title="設備投資"
            description="固定資産への投資額の分布"
            unit="億円"
            binSize={2000000000}
            scale={100000000}
            customFacts={[
              "中央値-50億円で全企業が設備投資を実施",
              "平均値-346億円で積極的な設備投資",
              "最大値-5万億円、最小値-10億円と幅広い",
              "0～-200億円の範囲に企業数が集中"
            ]}
            customFindings={[
              "設備投資は常にマイナスでキャッシュ流出を意味",
              "減価償却とのバランスで維持投資か成長投資かを判定",
              "設備投資率（対売上高）は業界平均で約3-6%",
              "製造業やインフラ業で高く、IT業では低い傾向"
            ]}
            customReferences={[
              "[内部] 投資キャッシュフロー、純固定資産",
              "[外部] <a href='https://www.development-bank.jp/research/economics/' class='text-blue-600 hover:text-blue-800 underline'>設備投資調査 - 日本政策投資銀行</a>",
              "[外部] <a href='https://www.meti.go.jp/statistics/tyo/kougyo/' class='text-blue-600 hover:text-blue-800 underline'>工業統計調査 - 経済産業省</a>"
            ]}
          />

          <FactSheet
            columnName="cash_dividends_paid"
            title="配当金支払"
            description="株主への配当金支払額の分布"
            unit="億円"
            binSize={1000000000}
            scale={100000000}
            customFacts={[
              "中央値-30億円で大半の企業が配当を実施",
              "平均値-125億円で着実な株主還元",
              "最大値-8810億円、最小値-10億円と中程度の範囲",
              "0～-100億円の範囲に企業数が集中"
            ]}
            customFindings={[
              "配当金支払は常にマイナスでキャッシュ流出",
              "配当性向算出で株主還元政策を評価可能",
              "日本企業の配当性向は約30%程度で欧米より低い",
              "安定配当政策で連続配当を維持する企業が多い"
            ]}
            customReferences={[
              "[内部] 財務キャッシュフロー、純利益",
              "[外部] <a href='https://www.tse.or.jp/market/data/' class='text-blue-600 hover:text-blue-800 underline'>市場データ - 東京証券取引所</a>",
              "[外部] <a href='https://www.jsda.or.jp/shiryoshitsu/toukei/' class='text-blue-600 hover:text-blue-800 underline'>証券統計 - 日本証券業協会</a>"
            ]}
          />
        </div>
      </div>
    </div>
  );
}
