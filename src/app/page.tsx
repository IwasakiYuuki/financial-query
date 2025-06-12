'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-financial-50 dark:from-gray-900 dark:via-gray-800 dark:to-financial-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-financial-100 dark:bg-financial-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-financial-600 dark:text-financial-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                FinancialQuery
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2">
              金融データの分布分析を多角的に可視化
            </p>
            <p className="text-sm text-financial-600 dark:text-financial-400 font-medium mb-8 px-4">
              企業情報・株価・為替・指標など幅広い金融データでデータドリブンな投資判断をサポート
            </p>
          </div>
        </div>
      </section>

      {/* 学習パスセクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  投資スキル向上の3ステップ
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                基礎から応用まで、段階的に投資分析力を向上させていけます
              </p>
            </div>
          
          {/* デスクトップ版：横並び */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {/* ステップ1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-financial-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                1
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-financial-600 dark:text-financial-400">基礎学習</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">ファクトブック</div>
              </div>
            </div>
            
            {/* 矢印1 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-financial-600 via-financial-500 to-green-600 max-w-20 rounded-full shadow-md"></div>
            
            {/* ステップ2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                2
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-green-600 dark:text-green-400">実践応用</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">アドホック分析</div>
              </div>
            </div>
            
            {/* 矢印2 */}
            <div className="flex-1 h-1 bg-gradient-to-r from-green-600 via-green-500 to-purple-600 max-w-20 rounded-full shadow-md"></div>
            
            {/* ステップ3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                3
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400">高度分析</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">クエリ実行</div>
              </div>
            </div>
          </div>

          {/* モバイル版：縦積み */}
          <div className="md:hidden space-y-8">
            {/* ステップ1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-financial-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                1
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-financial-600 dark:text-financial-400 mb-1">基礎学習</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">ファクトブック</div>
              </div>
              {/* 矢印（縦） */}
              <div className="w-1 h-12 bg-gradient-to-b from-financial-600 via-financial-500 to-green-600 rounded-full shadow-md mt-4"></div>
            </div>
            
            {/* ステップ2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                2
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-green-600 dark:text-green-400 mb-1">実践応用</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">アドホック分析</div>
              </div>
              {/* 矢印（縦） */}
              <div className="w-1 h-12 bg-gradient-to-b from-green-600 via-green-500 to-purple-600 rounded-full shadow-md mt-4"></div>
            </div>
            
            {/* ステップ3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                3
              </div>
              <div className="text-center">
                <div className="text-base font-bold text-purple-600 dark:text-purple-400 mb-1">高度分析</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">クエリ実行</div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* サービス一覧セクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                サービス一覧
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              投資判断を支援する3つの主要サービスを提供しています
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8 lg:p-12 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* ファクトブックカード */}
          <Link href="/factbook" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-financial-200 dark:hover:border-financial-700 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-financial-100 dark:bg-financial-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-financial-600 dark:text-financial-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-financial-600 dark:text-financial-400 bg-financial-50 dark:bg-financial-900 px-3 py-1 rounded-full">
                    市場理解を深める
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-financial-600 dark:group-hover:text-financial-400 transition-colors tracking-tight">
                  ファクトブック
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  投資仮説構築のための金融データ分布分析
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  企業財務、株価、為替、経済指標など
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-2 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    全ユーザー利用可能
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* アドホック分析カード */}
          <div className="group cursor-not-allowed">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-600 opacity-60 hover:opacity-80 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 px-3 py-1 rounded-full">
                    実践的投資戦略
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">
                  アドホック分析
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  検証済み投資アイデアと戦略レポート
                </p>
                <div className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                  {/* スペーサー */}
                  &nbsp;
                </div>
                <div className="flex items-center justify-center">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-3 py-2 rounded-full text-xs flex items-center">
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    開発中 - β版準備中
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* インタラクティブクエリカード */}
          <div className="group cursor-not-allowed">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-600 opacity-60 hover:opacity-80 transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900 px-3 py-1 rounded-full">
                    上級者向け
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">
                  インタラクティブクエリ
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  カスタム分析とデータ探索
                </p>
                <div className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                  {/* スペーサー */}
                  &nbsp;
                </div>
                <div className="flex items-center justify-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full text-xs flex items-center">
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8A6 6 0 006.025.25l.297 2.965a3.003 3.003 0 110 5.57l-.297 2.965A6 6 0 0018 8zM2 8a6 6 0 106.025 7.75l-.297-2.965a3.003 3.003 0 110-5.57l.297-2.965A6 6 0 002 8z" clipRule="evenodd" />
                    </svg>
                    限定ユーザー向け
                  </span>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* 説明セクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  データについて
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                このプラットフォームは、個人投資家の皆様が質の高い投資判断を行えるよう、
                企業財務、株価、為替、経済指標など幅広い金融データをヒストグラム形式で可視化し、
                各指標の分布状況を分野別に整理して提供しています。
                データドリブンな投資仮説の構築、市場分析、資産配分の参考資料としてご活用ください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ・よくある質問セクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
                よくある質問
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                FinancialQueryの使い方や機能について
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  FinancialQueryでは、どのような財務指標を分析できますか？
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  現在、<Link href="/factbook/income-statement" className="text-financial-600 dark:text-financial-400 hover:underline">損益計算書（P/L）</Link>の7項目、
                  <Link href="/factbook/balance-sheet" className="text-financial-600 dark:text-financial-400 hover:underline">貸借対照表（B/S）</Link>の11項目、
                  <Link href="/factbook/cash-flow" className="text-financial-600 dark:text-financial-400 hover:underline">キャッシュフロー計算書（C/F）</Link>の6項目、
                  合計25の財務指標をヒストグラム形式で可視化しています。総売上高、営業利益、純利益、総資産、株主資本、営業キャッシュフローなど、投資判断に重要な指標を網羅しています。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  データの更新頻度はどのくらいですか？
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  上場企業の財務諸表データは四半期ごとに更新され、最新の財務状況を反映したヒストグラム分析を提供しています。各指標の分布状況を通じて、企業の財務健全性や業界内での位置づけを把握できます。
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  ヒストグラム分析の活用方法を教えてください
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ヒストグラムを見ることで、ある企業の財務指標が「普通」なのか「異常」なのかを直感的に判断できます。例えば、ROE15%の企業があった場合、
                  <Link href="/factbook" className="text-financial-600 dark:text-financial-400 hover:underline">ファクトブック</Link>
                  でROEの分布を確認することで、それが上位20%に入る優秀な水準なのかを瞬時に理解できます。これにより、より深い投資仮説の構築が可能になります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}