'use client';

import Link from 'next/link';

export default function FactbookPage() {
  const categories = [
    {
      title: "企業情報",
      description: "上場企業の財務諸表データの分布分析",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      bgColor: "bg-financial-100 dark:bg-financial-900",
      iconColor: "text-financial-600 dark:text-financial-400",
      hoverColor: "group-hover:text-financial-600 dark:group-hover:text-financial-400",
      href: "/factbook/corporate",
      items: "損益計算書、貸借対照表、キャッシュフロー",
      available: true
    },
    {
      title: "株式市場",
      description: "株価指標と市場データの分布分析",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      bgColor: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      hoverColor: "group-hover:text-green-600 dark:group-hover:text-green-400",
      href: "/factbook/stock-market",
      items: "PER、PBR、時価総額、セクター分析",
      available: false
    },
    {
      title: "為替・通貨",
      description: "通貨ペアと為替レートの分布分析",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      hoverColor: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      href: "/factbook/currency",
      items: "主要通貨ペア、新興国通貨、仮想通貨",
      available: false
    },
    {
      title: "経済指標",
      description: "マクロ経済指標の分布分析",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      href: "/factbook/economic-indicators",
      items: "GDP、インフレ率、金利、債券利回り",
      available: false
    },
    {
      title: "投資指標",
      description: "投資商品とパフォーマンス指標の分析",
      icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
      bgColor: "bg-indigo-100 dark:bg-indigo-900",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      hoverColor: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
      href: "/factbook/investment",
      items: "投資信託、ETF、REIT、代替投資",
      available: false
    },
    {
      title: "商品・資源",
      description: "コモディティ価格の分布分析",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      bgColor: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-600 dark:text-amber-400",
      hoverColor: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
      href: "/factbook/commodities",
      items: "原油、金、銀、農産物、天然ガス",
      available: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-financial-50 dark:from-gray-900 dark:via-gray-800 dark:to-financial-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-financial-100 dark:bg-financial-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-financial-600 dark:text-financial-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                ファクトブック
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              幅広い金融データの分布分析を分野別に可視化
            </p>
            <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
              投資仮説構築のための包括的なデータ分析プラットフォーム
            </p>
          </div>
        </div>
      </section>

      {/* カテゴリ一覧セクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div key={index} className={`group ${category.available ? '' : 'cursor-not-allowed'}`}>
              {category.available ? (
                <Link href={category.href}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-financial-200 dark:hover:border-financial-700 transform hover:-translate-y-1 h-full">
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 ${category.bgColor} rounded-full flex items-center justify-center`}>
                        <svg className={`w-8 h-8 ${category.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                        </svg>
                      </div>
                      <div className="mb-4">
                        <span className="text-xs font-bold text-financial-600 dark:text-financial-400 bg-financial-50 dark:bg-financial-900 px-3 py-1 rounded-full">
                          利用可能
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black text-gray-900 dark:text-white mb-4 ${category.hoverColor} transition-colors tracking-tight`}>
                        {category.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {category.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {category.items}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-600 opacity-60 hover:opacity-80 transition-all duration-300 h-full">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 ${category.bgColor} rounded-full flex items-center justify-center`}>
                      <svg className={`w-8 h-8 ${category.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                      </svg>
                    </div>
                    <div className="mb-4">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full">
                        開発予定
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-600 dark:text-gray-300 mb-4 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      {category.items}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* ファクトブック活用法セクション */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  ファクトブックの活用法
                </h3>
              </div>
            </div>
            
            {/* プロセスフロー */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-financial-100 dark:bg-financial-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-financial-600 dark:text-financial-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. データを吸収</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    分布を見て市場の<br />
                    「常識」を頭に蓄積
                  </p>
                </div>
                
                {/* Arrow 1 */}
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. 感覚を養う</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    「普通」と「異常」を<br />
                    直感的に判断できる感覚
                  </p>
                </div>
                
                {/* Arrow 2 */}
                <div className="hidden md:flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. 質の高い仮説</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    蓄積された知識から<br />
                    鋭い投資仮説を構築
                  </p>
                </div>
              </div>
            </div>

            {/* 具体例セクション */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-red-800 dark:text-red-200">ファクトブック活用前</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-red-700 dark:text-red-300">「この企業のROEは15%だ」</p>
                  <p className="text-red-600 dark:text-red-400">→ それが高いのか低いのか判断できない</p>
                  <p className="text-red-600 dark:text-red-400">→ 表面的な分析に留まる</p>
                </div>
              </div>

              {/* After */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-200">ファクトブック活用後</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-emerald-700 dark:text-emerald-300">「この企業のROEは15%だ」</p>
                  <p className="text-emerald-600 dark:text-emerald-400">→ 上位20%に入る優秀な水準と瞬時に判断</p>
                  <p className="text-emerald-600 dark:text-emerald-400">→ より深い洞察と仮説を構築</p>
                </div>
              </div>
            </div>

            {/* 説明文 */}
          </div>
        </div>
      </section>
    </div>
  );
}
