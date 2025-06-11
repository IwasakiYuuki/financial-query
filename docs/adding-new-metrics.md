# 新しい財務指標追加手順

## 1. CSVデータファイルの準備

### データファイルの配置
`public/data/` ディレクトリに新しいCSVファイルを配置します。

**ファイル名規則:**
- 英語のスネークケース形式（例：`return_on_equity.csv`）
- 財務指標を表す適切な名前を使用

**CSVファイル形式:**
```csv
bin_start,bin_end,frequency
0,5000000000,25
5000000000,10000000000,45
10000000000,15000000000,67
...
```

**注意点:**
- `bin_start`: ビンの開始値（円単位）
- `bin_end`: ビンの終了値（円単位）  
- `frequency`: そのビンの企業数

## 2. 財務諸表別ページへの追加

新しい項目を追加したい財務諸表のページファイルを編集します：

### 損益計算書 (P/L)
ファイル: `src/app/factbook/income-statement/page.tsx`

### 貸借対照表 (B/S)  
ファイル: `src/app/factbook/balance-sheet/page.tsx`

### キャッシュフロー計算書 (C/F)
ファイル: `src/app/factbook/cash-flow/page.tsx`

## 3. FactSheetコンポーネントの追加

既存のFactSheetコンポーネントを参考に新しい項目を追加：

```tsx
<FactSheet
  data={新しい項目Data}
  title="新しい項目名（日本語）"
  description="この指標の説明文"
  unit="億円" // または "円"
  binSize={適切なビンサイズ}
  scale={100000000} // 億円の場合、円の場合は1
  xAxisMin={必要に応じて最小値}
  xAxisMax={必要に応じて最大値}
/>
```

## 4. データ読み込みの追加

ページコンポーネント内でCSVデータを読み込む処理を追加：

```tsx
const [新しい項目Data, set新しい項目Data] = useState<HistogramData[]>([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const data = await loadHistogramData('/data/新しいファイル名.csv');
      set新しい項目Data(data);
    } catch (error) {
      console.error('データ読み込みエラー:', error);
    }
  };
  loadData();
}, []);
```

## 5. パラメータ設定のガイドライン

### スケール設定
- **億円表示**: `scale={100000000}`
- **円表示**: `scale={1}`

### ビンサイズ設定
データの分布に応じて適切なビンサイズを設定：
- 大きな値の範囲: 10億円、50億円など
- 小さな値の範囲: 1億円、5億円など

### X軸範囲設定（オプション）
データの特性に応じてX軸の表示範囲を調整：
```tsx
xAxisMin={0}        // 最小値
xAxisMax={1000}     // 最大値（スケール変換後）
```

## 6. 確認とテスト

### 開発サーバーでの確認
```bash
npm run dev
```

### リントチェック
```bash
npm run lint
```

### ビルドテスト
```bash
npm run build
```

## 7. データファイル配置例

### ROE（自己資本利益率）を追加する場合

1. **ファイル作成**: `public/data/return_on_equity.csv`
2. **データ形式**:
```csv
bin_start,bin_end,frequency
-500000,0,15
0,50000,45
50000,100000,87
100000,150000,92
...
```

3. **コンポーネント追加**:
```tsx
<FactSheet
  data={roeData}
  title="ROE（自己資本利益率）"
  description="企業が株主資本をどれだけ効率的に活用して利益を生み出しているかを示す指標"
  unit="%"
  binSize={0.5}
  scale={1}
  xAxisMin={-5}
  xAxisMax={25}
/>
```

## 8. 現在実装済みの項目一覧

### 損益計算書（7項目）
- 総売上高、総利益、営業利益、税引前利益、純利益、EBITDA、希薄化後EPS

### 貸借対照表（11項目）  
- 総資産、流動負債、長期負債、総負債、株主資本、利益剰余金、現金及び現金同等物、棚卸資産、純固定資産、のれん、運転資本

### キャッシュフロー計算書（6項目）
- 営業CF、投資CF、財務CF、フリーCF、設備投資、配当金支払

## 注意事項

- CSVファイル名にタイポがないか確認
- データの単位（円 vs パーセント vs 倍率）を正確に設定
- 負の値を含む場合はX軸の最小値を適切に設定
- データの分布特性に応じたビンサイズの調整
- レスポンシブデザインの確認