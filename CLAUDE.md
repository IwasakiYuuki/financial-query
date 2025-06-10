# CLAUDE.md

日本語で回答してください。

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FinancialQuery** - 上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム。

**サイト構造:**
```
FinancialQuery
├── ファクトブック
│   └── 企業情報
│       ├── 損益計算書（P/L）
│       ├── 貸借対照表（B/S）
│       └── キャッシュフロー計算書（C/F）
├── アドホック分析（将来機能）
└── インタラクティブクエリ（将来機能）
```

現在はファクトブック機能のみ実装済み。25個の財務指標を3つの財務諸表別にヒストグラム形式で可視化している。

初期段階では管理者が手動でデータ分析基盤から表データを抽出し、CSVファイル（bin_start, bin_end, frequency形式）としてpublic/dataディレクトリに配置して参照する。

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **UI/CSS**: Tailwind CSS v3.4
- **Data Visualization**: Plotly.js + react-plotly.js (メイン), Chart.js + react-chartjs-2 (サブ)
- **Deployment**: Vercel (予定)
- **Data Format**: CSV files in public/data/ (bin_start, bin_end, frequency形式)
- **Linting**: ESLint 9.28.0 with Next.js TypeScript rules

## Commands

- `npm run dev`: 開発サーバー起動 (通常 localhost:3001)
- `npm run build`: プロダクションビルド
- `npm run start`: プロダクションサーバー起動
- `npm run lint`: ESLintでコードチェック

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト（Header組み込み済み）
│   ├── page.tsx                # ホームページ（3つのメインサービス表示）
│   ├── factbook/
│   │   ├── page.tsx            # ファクトブック企業情報ページ
│   │   ├── income-statement/   # 損益計算書分析ページ
│   │   ├── balance-sheet/      # 貸借対照表分析ページ
│   │   └── cash-flow/          # キャッシュフロー分析ページ
│   └── globals.css             # グローバルスタイル（Tailwind imports）
├── components/
│   ├── Header.tsx              # 共通ヘッダー（ナビゲーション、ドロップダウン）
│   ├── FactSheet.tsx           # メインファクトブックカードコンポーネント
│   ├── PlotlyHistogram.tsx     # Plotly.jsヒストグラムコンポーネント
│   └── HistogramChart.tsx      # Chart.jsヒストグラムコンポーネント（レガシー）
└── lib/
    ├── csvUtils.ts             # CSV読み込みユーティリティ（新形式対応）
    └── dummyData.ts            # ダミーデータ生成（レガシー）

public/
└── data/                       # 25個の財務指標CSVファイル
    ├── total_revenue.csv       # 総売上高
    ├── operating_income.csv    # 営業利益
    ├── net_income.csv          # 純利益
    ├── total_assets.csv        # 総資産
    ├── operating_cash_flow.csv # 営業CF
    └── ... (他21個のファイル)
```

## Component Structure

### Header.tsx
全ページ共通のヘッダーコンポーネント：
- FinancialQueryロゴとサブタイトル
- ドロップダウン付きナビゲーション（ファクトブック）
- 将来機能表示（「近日公開」バッジ付き）
- レスポンシブ対応（モバイルメニュー）

### FactSheet.tsx
メインのファクトブックカードコンポーネント。以下の要素を含む：
- ヘッダー（タイトル、説明、更新日）
- 統計量サマリー（6つのメトリクス：総数、平均値、中央値、最小値、最大値、レンジ）
- Plotlyヒストグラム
- Facts/Findings/References セクション

**Props:**
- `data: HistogramData[]` - ヒストグラムデータ
- `title: string` - タイトル
- `description: string` - 説明文
- `unit: string` - 単位（例: "億円", "円"）
- `binSize: number` - ビンサイズ（元データ基準）
- `xAxisMin?: number` - X軸最小値（元データ基準）
- `xAxisMax?: number` - X軸最大値（元データ基準）
- `scale?: number` - 単位変換スケール（例：億円=100000000）

### PlotlyHistogram.tsx
Plotly.jsを使用した真のヒストグラムコンポーネント：
- 連続的な棒グラフ（隙間なし）
- 動的なX軸範囲設定（データ範囲に最適化）
- カスタマイズ可能なビンサイズ
- ホバー効果とツールチップ

**Props:**
- `data: HistogramData[]` - スケール変換済みデータ
- `title: string`
- `binSize?: number` - スケール変換済みビンサイズ
- `xAxisMin?: number` - スケール変換済み最小値
- `xAxisMax?: number` - スケール変換済み最大値

## Data Structure

### HistogramData Interface
```typescript
interface HistogramData {
  bin: number;    // ビンの開始値（円単位）
  freq: number;   // 頻度
}
```

### CSV Data Format
**元データ形式** (public/data/*.csv):
```csv
bin_start,bin_end,frequency
0,10000000000,107
10000000000,20000000000,196
...
```

**変換後データ形式** (FactSheet内部):
```typescript
// csvUtils.tsで自動変換
[
  { bin: 0, freq: 107 },           // bin_start → bin
  { bin: 10000000000, freq: 196 }, // bin_start → bin
  ...
]
```

### 現在の財務指標（25項目）

**損益計算書（P/L）- 7項目:**
- total_revenue.csv（総売上高）- 億円表示
- gross_profit.csv（総利益）- 億円表示  
- operating_income.csv（営業利益）- 億円表示
- pretax_income.csv（税引前利益）- 億円表示
- net_income.csv（純利益）- 億円表示
- ebitda.csv（EBITDA）- 億円表示
- diluted_eps.csv（希薄化後EPS）- 円表示

**貸借対照表（B/S）- 11項目:**
- total_assets.csv（総資産）- 億円表示
- current_liabilities.csv（流動負債）- 億円表示
- long_term_debt.csv（長期負債）- 億円表示
- total_debt.csv（総負債）- 億円表示
- stockholders_equity.csv（株主資本）- 億円表示
- retained_earnings.csv（利益剰余金）- 億円表示
- cash_and_cash_equivalents.csv（現金及び現金同等物）- 億円表示
- inventory.csv（棚卸資産）- 億円表示
- net_ppe.csv（純固定資産）- 億円表示
- goodwill.csv（のれん）- 億円表示
- working_capital.csv（運転資本）- 億円表示

**キャッシュフロー計算書（C/F）- 6項目:**
- operating_cash_flow.csv（営業CF）- 億円表示
- investing_cash_flow.csv（投資CF）- 億円表示
- financing_cash_flow.csv（財務CF）- 億円表示
- free_cash_flow.csv（フリーCF）- 億円表示
- capital_expenditure.csv（設備投資）- 億円表示
- cash_dividends_paid.csv（配当金支払）- 億円表示

## Styling Notes

- **デザイン**: プロフェッショナルで落ち着いたスタイル
- **カラーパレット**: グレー/スレート基調、適度なアクセントカラー
- **レスポンシブ**: グリッドレイアウトでモバイル対応
- **ホバー効果**: 統計カード、セクションで軽微なインタラクション

## Unit Conversion System

CSVデータは全て円単位で統一し、表示側で適切な単位に変換：

**スケール設定:**
- 億円表示: `scale={100000000}` (1億円 = 100,000,000円)
- 円表示: `scale={1}` (変換なし)

**変換の流れ:**
1. CSVから円単位データを読み込み
2. FactSheetコンポーネントで`scaledData = data.map(item => ({ bin: item.bin / scale, freq: item.freq }))`
3. 統計量も同様にスケール変換
4. PlotlyHistogramに変換済みデータとパラメータを渡す

## Development Notes

- Plotly.jsは動的インポート（SSR対応）で読み込み
- Tailwind CSS v3.4を使用（v4との互換性問題により）
- 各ファクトシートは独立したカードとして配置可能
- X軸範囲（xAxisMin/xAxisMax）とビンサイズは各データの特性に合わせて調整可能
- CSVファイル名のタイポ修正済み（net_imcome.csv → net_income.csv）
- eslint.config.js設定済み（CommonJS形式でNext.js TypeScriptルール適用）

## Page Structure

**現在実装済み:**
- `/` - ホームページ（3つのメインサービス表示）
- `/factbook` - ファクトブック企業情報ページ（3つの財務諸表へのリンク）
- `/factbook/income-statement` - 損益計算書分析（7項目）
- `/factbook/balance-sheet` - 貸借対照表分析（11項目）  
- `/factbook/cash-flow` - キャッシュフロー分析（6項目）

**将来実装予定:**
- `/analysis` - アドホック分析（投資レポート）
- `/query` - インタラクティブクエリ（カスタム分析）
