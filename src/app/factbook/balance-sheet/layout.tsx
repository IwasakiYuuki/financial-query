import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '貸借対照表分析 - B/S財務指標',
  description: '上場企業の貸借対照表11項目（総資産、流動負債、長期負債、総負債、株主資本、利益剰余金、現金、棚卸資産、純固定資産、のれん、運転資本）をヒストグラムで可視化。',
  keywords: ['貸借対照表', 'B/S', '総資産', '株主資本', '負債', '現金', '棚卸資産', '財務分析', '上場企業'],
  openGraph: {
    title: '貸借対照表分析 - B/S財務指標 | FinancialQuery',
    description: '上場企業の貸借対照表11項目をヒストグラムで可視化。企業の財務健全性分析をサポート。',
    url: 'https://financial-query.vercel.app/factbook/balance-sheet',
  },
};

export default function BalanceSheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}