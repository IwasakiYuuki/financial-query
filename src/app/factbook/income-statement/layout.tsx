import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '損益計算書分析 - P/L財務指標',
  description: '上場企業の損益計算書7項目（総売上高、総利益、営業利益、税引前利益、純利益、EBITDA、希薄化後EPS）をヒストグラムで可視化。企業の収益性分析と投資判断をサポート。',
  keywords: ['損益計算書', 'P/L', '総売上高', '営業利益', '純利益', 'EBITDA', 'EPS', '財務分析', '上場企業'],
  openGraph: {
    title: '損益計算書分析 - P/L財務指標 | FinancialQuery',
    description: '上場企業の損益計算書7項目をヒストグラムで可視化。企業の収益性分析と投資判断をサポート。',
    url: 'https://financial-query.vercel.app/factbook/income-statement',
  },
};

export default function IncomeStatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}