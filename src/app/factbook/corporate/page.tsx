'use client';

import Link from 'next/link';

export default function CorporatePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            企業情報
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            上場企業の財務諸表データの分布分析を財務諸表別に可視化
          </p>
          <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
            企業の財務分析や業界比較、投資判断の参考資料
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {/* 損益計算書カード */}
          <Link href="/factbook/income-statement" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-financial-200 dark:hover:border-financial-700 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-financial-100 dark:bg-financial-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-financial-600 dark:text-financial-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-financial-600 dark:text-financial-400 bg-financial-50 dark:bg-financial-900 px-3 py-1 rounded-full">
                    利用可能
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-financial-600 dark:group-hover:text-financial-400 transition-colors tracking-tight">
                  損益計算書（P/L）
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  企業の収益性を示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  総売上高、営業利益、純利益など7項目
                </div>
              </div>
            </div>
          </Link>

          {/* 貸借対照表カード */}
          <Link href="/factbook/balance-sheet" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-financial-200 dark:hover:border-financial-700 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-financial-600 dark:text-financial-400 bg-financial-50 dark:bg-financial-900 px-3 py-1 rounded-full">
                    利用可能
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors tracking-tight">
                  貸借対照表（B/S）
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  企業の財政状態を示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  総資産、負債、純資産など11項目
                </div>
              </div>
            </div>
          </Link>

          {/* キャッシュフロー計算書カード */}
          <Link href="/factbook/cash-flow" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-financial-200 dark:hover:border-financial-700 transform hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-financial-600 dark:text-financial-400 bg-financial-50 dark:bg-financial-900 px-3 py-1 rounded-full">
                    利用可能
                  </span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-tight">
                  キャッシュフロー計算書（C/F）
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  企業の現金の流れを示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  営業CF、投資CF、財務CFなど6項目
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              企業情報について
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
              企業情報セクションでは、上場企業の財務データをヒストグラム形式で可視化し、
              各財務指標の分布状況を財務諸表別に整理して提供しています。
              企業の財務分析や業界比較、投資判断の参考資料としてご活用ください。
            </p>

            {/* データ定義セクション */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                データ定義
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-bold text-financial-600 dark:text-financial-400 mb-2">データソース</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yahoo! Finance (yfinance)
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-bold text-financial-600 dark:text-financial-400 mb-2">対象期間</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      現時点から過去4回分の年間決算情報
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-bold text-financial-600 dark:text-financial-400 mb-2">対象企業</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      東京証券取引所プライム市場上場企業（約1,600社）
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-bold text-financial-600 dark:text-financial-400 mb-2">分析項目</h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      25の財務指標（P/L：7項目、B/S：11項目、C/F：6項目）
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  ※ データは年間決算ベースで集計されており、企業の決算期の違いにより最新データの基準日は企業ごとに異なります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
