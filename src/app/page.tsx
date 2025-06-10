'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FinancialQuery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            上場企業の財務諸表データの分布分析を財務諸表別に可視化
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* ファクトブックカード */}
          <Link href="/factbook" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  ファクトブック
                </h2>
                <p className="text-gray-600 mb-4">
                  企業の財務諸表データの分布分析
                </p>
                <div className="text-sm text-gray-500">
                  損益計算書、貸借対照表、キャッシュフロー計算書
                </div>
              </div>
            </div>
          </Link>

          {/* アドホック分析カード */}
          <div className="group cursor-not-allowed">
            <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200 opacity-60">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-600 mb-3">
                  アドホック分析
                </h2>
                <p className="text-gray-500 mb-4">
                  投資に直接使える分析レポート
                </p>
                <div className="text-sm text-gray-400">
                  <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded-full text-xs">
                    近日公開
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* インタラクティブクエリカード */}
          <div className="group cursor-not-allowed">
            <div className="bg-gray-100 rounded-lg shadow-lg p-8 border border-gray-200 opacity-60">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-600 mb-3">
                  インタラクティブクエリ
                </h2>
                <p className="text-gray-500 mb-4">
                  カスタムデータ分析とクエリ実行
                </p>
                <div className="text-sm text-gray-400">
                  <span className="bg-gray-200 text-gray-500 px-2 py-1 rounded-full text-xs">
                    近日公開
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              データについて
            </h3>
            <p className="text-gray-600 leading-relaxed">
              このサイトでは、上場企業の財務データをヒストグラム形式で可視化し、
              各財務指標の分布状況を財務諸表別に整理して提供しています。
              企業の財務分析や業界比較、投資判断の参考資料としてご活用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}