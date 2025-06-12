import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import { ThemeProvider } from '@/lib/theme'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: {
    template: '%s | FinancialQuery',
    default: 'FinancialQuery - 財務データ分析プラットフォーム'
  },
  description: '上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム。損益計算書、貸借対照表、キャッシュフロー計算書の25項目をヒストグラムで可視化し、投資判断をサポートします。',
  keywords: ['財務分析', '財務諸表', '上場企業', '投資', 'ヒストグラム', '損益計算書', '貸借対照表', 'キャッシュフロー', '財務データ', '分析プラットフォーム'],
  authors: [{ name: 'FinancialQuery Team' }],
  creator: 'FinancialQuery',
  publisher: 'FinancialQuery',
  metadataBase: new URL('https://financial-query.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FinancialQuery - 財務データ分析プラットフォーム',
    description: '上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム',
    url: 'https://financial-query.vercel.app',
    siteName: 'FinancialQuery',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FinancialQuery - 財務データ分析プラットフォーム',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinancialQuery - 財務データ分析プラットフォーム',
    description: '上場企業の財務諸表データの分布分析を財務諸表別に可視化',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <StructuredData type="webapp" />
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
