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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            ファクトブック
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            幅広い金融データの分布分析を分野別に可視化
          </p>
          <p className="text-sm text-financial-600 dark:text-financial-400 font-medium">
            投資仮説構築のための包括的なデータ分析プラットフォーム
          </p>
        </div>

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

        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              ファクトブックについて
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              ファクトブックでは、企業財務、株価、為替、経済指標など幅広い金融データをヒストグラム形式で可視化し、
              各指標の分布状況を分野別に整理して提供しています。
              データドリブンな投資仮説の構築、市場分析、資産配分の参考資料としてご活用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}