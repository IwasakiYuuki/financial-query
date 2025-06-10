'use client';

import Link from 'next/link';

export default function FactbookPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ファクトブック - 企業情報</h1>
          <p className="text-gray-600">上場企業の財務諸表データの分布分析を財務諸表別に提供</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 損益計算書カード */}
          <Link href="/factbook/income-statement" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  損益計算書（P/L）
                </h2>
                <p className="text-gray-600 mb-4">
                  企業の収益性を示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500">
                  総売上高、営業利益、純利益など7項目
                </div>
              </div>
            </div>
          </Link>

          {/* 貸借対照表カード */}
          <Link href="/factbook/balance-sheet" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  貸借対照表（B/S）
                </h2>
                <p className="text-gray-600 mb-4">
                  企業の財政状態を示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500">
                  総資産、負債、純資産など11項目
                </div>
              </div>
            </div>
          </Link>

          {/* キャッシュフロー計算書カード */}
          <Link href="/factbook/cash-flow" className="group">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  キャッシュフロー計算書（C/F）
                </h2>
                <p className="text-gray-600 mb-4">
                  企業の現金の流れを示す財務諸表の分析
                </p>
                <div className="text-sm text-gray-500">
                  営業CF、投資CF、財務CFなど6項目
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ファクトブックについて
            </h3>
            <p className="text-gray-600 leading-relaxed">
              ファクトブックでは、上場企業の財務データをヒストグラム形式で可視化し、
              各財務指標の分布状況を財務諸表別に整理して提供しています。
              企業の財務分析や業界比較、投資判断の参考資料としてご活用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}