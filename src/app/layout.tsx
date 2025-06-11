import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import { ThemeProvider } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'FinancialQuery - 財務データ分析プラットフォーム',
  description: '上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム',
  verification: {
    google: "E7vnbjvrdkhdixjbe2oejZmC3vmBcDGxJbBBPNejDgM"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
