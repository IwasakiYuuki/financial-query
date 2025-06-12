import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'キャッシュフロー分析 - C/F財務指標',
  description: '上場企業のキャッシュフロー計算書6項目（営業CF、投資CF、財務CF、フリーCF、設備投資、配当金支払）をヒストグラムで可視化。企業のキャッシュ創出力分析をサポート。',
  keywords: ['キャッシュフロー', 'C/F', '営業CF', '投資CF', '財務CF', 'フリーCF', '設備投資', '財務分析', '上場企業'],
  openGraph: {
    title: 'キャッシュフロー分析 - C/F財務指標 | FinancialQuery',
    description: '上場企業のキャッシュフロー計算書6項目をヒストグラムで可視化。企業のキャッシュ創出力分析をサポート。',
    url: 'https://financial-query.vercel.app/factbook/cash-flow',
  },
};

export default function CashFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}