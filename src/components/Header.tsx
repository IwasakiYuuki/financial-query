'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム', active: pathname === '/' },
    { 
      href: '/factbook', 
      label: 'ファクトブック', 
      active: pathname.startsWith('/factbook'),
      submenu: [
        { href: '/factbook', label: '企業情報' },
        { href: '/factbook/income-statement', label: '損益計算書' },
        { href: '/factbook/balance-sheet', label: '貸借対照表' },
        { href: '/factbook/cash-flow', label: 'キャッシュフロー' },
      ]
    },
    { href: '/analysis', label: 'アドホック分析', active: pathname.startsWith('/analysis'), disabled: true },
    { href: '/query', label: 'インタラクティブクエリ', active: pathname.startsWith('/query'), disabled: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ・サイト名 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinancialQuery</h1>
                <p className="text-xs text-gray-500">財務データ分析プラットフォーム</p>
              </div>
            </Link>
          </div>

          {/* ナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.disabled ? (
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed">
                    {item.label}
                    <span className="ml-1 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">
                      近日公開
                    </span>
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                        item.active
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                      {item.submenu && (
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                    
                    {/* サブメニュー */}
                    {item.submenu && (
                      <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              aria-label="メニュー"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション（簡易版） */}
        <div className="md:hidden border-t border-gray-200 pt-4 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                item.active
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}