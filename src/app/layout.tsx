import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'FinancialQuery - 財務データ分析プラットフォーム',
  description: '上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}