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
- **Data Visualization**: Plotly.js + react-plotly.js
- **Deployment**: Vercel (予定)
- **Data Format**: CSV files in public/data/ (hist.csv, stat.csv形式)
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
│   ├── ui/                     # 基本UIコンポーネント
│   │   ├── Header.tsx          # 共通ヘッダー（ナビゲーション、ドロップダウン）
│   │   └── index.ts
│   ├── charts/                 # グラフ関連コンポーネント
│   │   ├── PlotlyHistogram.tsx # Plotly.jsヒストグラムコンポーネント
│   │   └── index.ts
│   ├── factbook/               # ファクトブック専用コンポーネント
│   │   ├── FactSheet.tsx       # メインファクトブックカードコンポーネント
│   │   └── index.ts
│   ├── seo/                    # SEO関連コンポーネント
│   │   ├── StructuredData.tsx  # 構造化データコンポーネント
│   │   └── index.ts
│   └── index.ts                # 統合エクスポート
└── lib/
    ├── csvUtils.ts             # CSV読み込みユーティリティ（新形式対応）
    └── theme.tsx               # テーマ管理

public/
└── data/
    └── factbook/               # 25個の財務指標ディレクトリ
        ├── total_revenue/      # 総売上高
        │   ├── hist.csv        # ヒストグラムデータ
        │   └── stat.csv        # 統計データ
        ├── operating_income/   # 営業利益
        ├── net_income/         # 純利益
        ├── total_assets/       # 総資産
        ├── operating_cash_flow/ # 営業CF
        └── ... (他20個のディレクトリ)
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
Plotly.jsを使用した高機能ヒストグラムコンポーネント：
- 連続的な棒グラフ（隙間なし）
- 自動5%/95%パーセンタイルトリミング
- 累積分布表示（第2軸）
- 連続的な累積分布線（空白区間補間）
- ダイナミックテーマ対応
- ホバー効果とツールチップ

**Props:**
- `data: HistogramData[]` - スケール変換済みデータ
- `title: string`
- `unit: string` - 単位表示
- `binSize?: number` - スケール変換済みビンサイズ
- `xAxisMin?: number` - 手動X軸最小値（任意）
- `xAxisMax?: number` - 手動X軸最大値（任意）

**主要機能:**
- 個別データ展開による精密パーセンタイル計算
- NaN対策済みのビン幅自動検出
- 空白区間を補間した滑らかな累積分布

## Data Structure

### HistogramData Interface
```typescript
interface HistogramData {
  bin: number;      // ビンの開始値（円単位）
  freq: number;     // 頻度
  binEnd?: number;  // ビンの終了値（新形式CSV）
}
```

### StatisticsData Interface
```typescript
interface StatisticsData {
  num: number;    // サンプル数
  avg: number;    // 平均値
  med: number;    // 中央値
  min: number;    // 最小値
  max: number;    // 最大値
}
```

### CSV Data Format
**新ディレクトリ構造** (public/data/factbook/{metric}/):
- `hist.csv` - ヒストグラムデータ (bin_start, bin_end, frequency)
- `stat.csv` - 統計データ (num, avg, med, min, max)

**ヒストグラムCSV形式**:
```csv
bin_start,bin_end,frequency
-431500000000,-431400000000,1
-354900000000,-354800000000,1
0,100000000,3
...
```

**統計CSV形式**:
```csv
num,avg,med,min,max
1143,49877312032.95669,9838000000.0,-431428000000.0,5352935000000.0
```

**変換後データ形式** (csvUtils.ts):
```typescript
// bin_start/bin_endの正規化処理
{
  bin: Math.min(binStart, binEnd),    // 常に小さい値
  freq: frequency,
  binEnd: Math.max(binStart, binEnd)  // 常に大きい値
}
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

### 技術的詳細
- Plotly.jsは動的インポート（SSR対応）で読み込み
- Tailwind CSS v3.4を使用（v4との互換性問題により）
- eslint.config.js設定済み（CommonJS形式でNext.js TypeScriptルール適用）

### 修正済み問題
1. **横軸方向の修正** - bin_start > bin_endデータの正規化処理
2. **5%パーセンタイルトリミング** - 個別データ展開による精密計算
3. **NaN問題の解決** - actualBinWidth計算の安定化
4. **累積分布の連続性** - 空白区間補間による滑らかな折れ線
5. **コンポーネント整理** - 役割別ディレクトリ構造とindex.ts管理

### データ処理の改良
- 集約データでのパーセンタイル計算限界を個別展開で解決
- ビン幅自動検出でのNaN対策（フィルタリング追加）
- 累積分布でのデータ欠損区間を補間処理で連続化

### リファクタリング完了事項
- レガシーファイル削除（dummyData.ts, HistogramChart.tsx）
- コンポーネントの役割別分割（ui/, charts/, factbook/, seo/）
- import文の整理（統合index.tsによる綺麗なインポート）

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
