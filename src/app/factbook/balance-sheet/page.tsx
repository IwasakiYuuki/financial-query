'use client';

import { FactSheet } from '@/components';

export default function BalanceSheetPage() {

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
            columnName="total_assets"
            title="総資産"
            description="企業が保有する全ての資産の総額分布"
            unit="億円"
            binSize={100000000000}
            scale={100000000}
            customFacts={[
              "最大値が400兆円超で、平均値の約150倍",
              "企業数が最も多いのは0-1000億円の範囲",
              "平均値が2.7兆円と中央値の27倍ほどある",
              "1兆円以上の企業が全体の約2割を占める"
            ]}
            customFindings={[
              "企業規模を表す最も基本的な指標",
              "ROA計算の分母で資産効率性を測定",
              "資産構成で流動性と安全性を判断",
              "大企業のシェアが圧倒的で小規模企業が多数"
            ]}
            customReferences={[
              "[内部] 総負債、株主資本",
              "[外部] <a href='https://www.mof.go.jp/pri/publication/financial_review/fr_list4.html' class='text-blue-600 hover:text-blue-800 underline'>財務総合政策研究所 - 財務省</a>",
              "[外部] <a href='https://www.boj.or.jp/statistics/tk/tokei_1.htm' class='text-blue-600 hover:text-blue-800 underline'>資金循環統計 - 日本銀行</a>"
            ]}
          />

          <FactSheet
            columnName="current_liabilities"
            title="流動負債"
            description="1年以内に支払い期限が到来する負債の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "半分の企業が500億円未満",
              "1兆円を越えるのは全体の約5%",
              "最大値の80兆円超の企業も存在",
            ]}
            customFindings={[
              "流動性リスク管理で最も重要な指標",
              "流動比率計算で短期支払能力を評価",
              "運転資本計算の主要要素の一つ",
              "上位5%の大企業が全体の大部分を占める"
            ]}
            customReferences={[
              "[内部] 運転資本、総負債",
              "[外部] <a href='https://www.jftc.or.jp/research/cr_research/' class='text-blue-600 hover:text-blue-800 underline'>信用リスク調査 - 日本金融取引所</a>",
              "[外部] <a href='https://www.zenginkyo.or.jp/stats/' class='text-blue-600 hover:text-blue-800 underline'>金融統計 - 全国銀行協会</a>"
            ]}
          />

          <FactSheet
            columnName="long_term_debt"
            title="長期負債"
            description="1年を超える長期的な債務の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "4割の企業が100億円未満",
              "1.2兆円を越えるのは約5%の企業のみ",
              "0-100億円の区間は他の区間の3倍以上の企業数",
              "700億円以降は企業数がほぼ横ばい"
            ]}
            customFindings={[
              "設備投資や事業拡大の資金調達手段",
              "D/Eレシオやレバレッジ指標の主要要素",
              "金利リスクや信用リスクの源泉",
              "企業の約4割が低レベルで健全経営"
            ]}
            customReferences={[
              "[内部] 総負債、株主資本",
              "[外部] <a href='https://www.jcra.co.jp/research/report/' class='text-blue-600 hover:text-blue-800 underline'>信用格付研究 - 日本格付研究所</a>",
              "[外部] <a href='https://www.development-bank.jp/research/research.html' class='text-blue-600 hover:text-blue-800 underline'>調査レポート - 日本政策投資銀行</a>"
            ]}
          />

          <FactSheet
            columnName="total_debt"
            title="総負債"
            description="企業の負債総額の分布"
            unit="億円"
            binSize={20000000000}
            scale={100000000}
            customFacts={[
              "3割の企業が100億円未満",
              "2兆円を越えるのは約5%の企業のみ",
              "0-100億円の区間は他の区間の2倍以上の企業数",
              "1500億円以降は企業数がほぼ横ばい"
            ]}
            customFindings={[
              "総資産とのバランスで負債比率を算出",
              "レバレッジ経営のリスクとリターンのバランス",
              "信用格付や金利水準決定の重要因子",
              "上位5%の大企業が負債総額の大部分を占める"
            ]}
            customReferences={[
              "[内部] 総資産、流動負債、長期負債",
              "[外部] <a href='https://www.r-i.co.jp/research/research_report/' class='text-blue-600 hover:text-blue-800 underline'>信用格付研究 - 格付投資情報センター</a>",
              "[外部] <a href='https://www.standardandpoors.com/ja_JP/web/guest/home' class='text-blue-600 hover:text-blue-800 underline'>信用格付 - S&Pグローバル</a>"
            ]}
          />

          <FactSheet
            columnName="stockholders_equity"
            title="株主資本"
            description="株主の持分に相当する資本の分布"
            unit="億円"
            binSize={20000000000}
            scale={100000000}
            customFacts={[
              "300-400億円が最も多い",
              "全体の半数以上は1000億円未満",
              "0-400億円までは上昇傾向、その後は減少傾向",
              "赤字でマイナス株主資本の企業も少数存在"
            ]}
            customFindings={[
              "ROE計算の分母で株主資本利益率を算出",
              "BPS算出で株価の理論価値を評価",
              "自己資本比率で財務安全性を判定",
              "マイナス株主資本は特別管理が必要"
            ]}
            customReferences={[
              "[内部] 総資産、利益剰余金",
              "[外部] <a href='https://www.jsda.or.jp/shiryoshitsu/toukei/' class='text-blue-600 hover:text-blue-800 underline'>証券統計 - 日本証券業協会</a>",
              "[外部] <a href='https://www.tse.or.jp/market/data/' class='text-blue-600 hover:text-blue-800 underline'>市場データ - 東京証券取引所</a>"
            ]}
          />

          <FactSheet
            columnName="retained_earnings"
            title="利益剰余金"
            description="企業が蓄積してきた利益の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "100-200億円が最も多い",
              "全体の半数以上は700億円未満",
              "0-200億円までは上昇傾向、その後は減少傾向",
              "赤字でマイナスの企業も少数存在"
            ]}
            customFindings={[
              "過去の累積純利益から配当を差し引いた残高",
              "配当原資や自己株式取得の財源",
              "企業の成長性と配当政策のバランスを表現",
              "マイナス剰余金は特別管理が必要"
            ]}
            customReferences={[
              "[内部] 株主資本、純利益",
              "[外部] <a href='https://www.nta.go.jp/publication/statistics/kokuzeicho/kaishahyohon/' class='text-blue-600 hover:text-blue-800 underline'>会社標本調査 - 国税庁</a>",
              "[外部] <a href='https://www.mof.go.jp/pri/publication/financial_review/' class='text-blue-600 hover:text-blue-800 underline'>企業ファイナンス研究 - 財務省</a>"
            ]}
          />

          <FactSheet
            columnName="cash_and_cash_equivalents"
            title="現金及び現金同等物"
            description="企業が保有する現金・預金等の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "100億未満の企業が約2割を占め、最も多い",
              "企業の半数は300億円未満",
              "1兆を越えるのは約5%の企業のみ",
            ]}
            customFindings={[
              "流動性管理で最も重要な資産項目",
              "当座比率や現金比率で流動性を評価",
              "日本企業は世界的に見て現金保有水準が高い",
              "現金比率10-20%が適正な水準とされる"
            ]}
            customReferences={[
              "[内部] 総資産、運転資本",
              "[外部] <a href='https://www.boj.or.jp/statistics/sj/sjexp.pdf' class='text-blue-600 hover:text-blue-800 underline'>短期経済観測調査 - 日本銀行</a>",
              "[外部] <a href='https://www.teikoku-databank.co.jp/report/watching/' class='text-blue-600 hover:text-blue-800 underline'>企業分析 - 帝国データバンク</a>"
            ]}
          />

          <FactSheet
            columnName="inventory"
            title="棚卸資産"
            description="在庫として保有している資産の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "100億未満の企業が約4割を占め、最も多い",
              "企業の半数は200億円未満",
              "5000億円を越えるのは約5%の企業のみ",
            ]}
            customFindings={[
              "業界特性が最も明確に表れる資産項目",
              "在庫回転率で営業効率を測定可能",
              "運転資本計算の主要要素の一つ",
              "製造業や小売業で高く、IT業では低い"
            ]}
            customReferences={[
              "[内部] 運転資本、総資産",
              "[外部] <a href='https://www.meti.go.jp/statistics/tyo/kougyo/' class='text-blue-600 hover:text-blue-800 underline'>工業統計調査 - 経済産業省</a>",
              "[外部] <a href='https://www.meti.go.jp/statistics/tyo/syokozi/' class='text-blue-600 hover:text-blue-800 underline'>商工業実態基本調査 - 経済産業省</a>"
            ]}
          />

          <FactSheet
            columnName="net_ppe"
            title="純固定資産"
            description="減価償却後の固定資産の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "100億未満の企業が約2割を占め、最も多い",
              "企業の半数は400億円未満",
              "1兆円を越えるのは約5%の企業のみ",
            ]}
            customFindings={[
              "事業の資本集約度を表す重要指標",
              "固定資産回転率で資産効率を評価",
              "減価償却や設備投資計画の基礎データ",
              "インフラや製造業で高く、IT業では低い"
            ]}
            customReferences={[
              "[内部] 総資産、棚卸資産",
              "[外部] <a href='https://www.development-bank.jp/research/economics/' class='text-blue-600 hover:text-blue-800 underline'>設備投資調査 - 日本政策投資銀行</a>",
              "[外部] <a href='https://www.jbaudit.go.jp/kanshi/report/' class='text-blue-600 hover:text-blue-800 underline'>企業監視レポート - 会計検査院</a>"
            ]}
          />

          <FactSheet
            columnName="goodwill"
            title="のれん"
            description="M&A等で発生したのれんの分布"
            unit="億円"
            binSize={1000000000}
            scale={100000000}
            customFacts={[
              "10億円未満の企業が約4割を占め、最も多い",
              "600億円までで約9割を占める",
              "200億円付近から企業数はほぼ横ばい",
              "最大値5.7兆円は平均の約100倍",
            ]}
            customFindings={[
              "M&A戦略の成果とリスクを表現する項目",
              "のれん減損リスクで将来収益に影響",
              "無形資産の主要要素で知的資産を反映",
              "大半の企業はのれんを保有せずオーガニック成長"
            ]}
            customReferences={[
              "[内部] 総資産、純固定資産",
              "[外部] <a href='https://www.recof.co.jp/research/mastatistics/' class='text-blue-600 hover:text-blue-800 underline'>M&A統計 - レコフ</a>",
              "[外部] <a href='https://www.marr.jp/research/report/' class='text-blue-600 hover:text-blue-800 underline'>M&Aレポート - ストライク</a>"
            ]}
          />

          <FactSheet
            columnName="working_capital"
            title="運転資本"
            description="営業活動に必要な運転資金の分布"
            unit="億円"
            binSize={10000000000}
            scale={100000000}
            customFacts={[
              "企業の半分は400億円未満",
              "最小値-3.6兆円の企業も存在",
              "最大値5.9兆円は平均の約60倍",
            ]}
            customFindings={[
              "流動資産から流動負債を差し引いた正味資金",
              "運転資本回転率で営業効率を評価",
              "マイナスは効率的な資金運用を意味",
              "最大違い9.5兆円で企業間の格差が極端"
            ]}
            customReferences={[
              "[内部] 流動負債、棚卸資産、現金及び現金同等物",
              "[外部] <a href='https://www.cfo.jp/research/' class='text-blue-600 hover:text-blue-800 underline'>CFO調査 - CFOフォーラム</a>",
              "[外部] <a href='https://www.tsr-net.co.jp/news/status/' class='text-blue-600 hover:text-blue-800 underline'>流動性分析 - 東京商工リサーチ</a>"
            ]}
          />
        </div>
      </div>
    </div>
  );
}
