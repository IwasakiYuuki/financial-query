export interface HistogramData {
  bin: number;
  freq: number;
}

// 総売上高のダミーデータ（百万円単位、500単位のビン）
export const totalRevenueData: HistogramData[] = [
  { bin: 500, freq: 52 },
  { bin: 1000, freq: 45 },
  { bin: 1500, freq: 38 },
  { bin: 2000, freq: 32 },
  { bin: 2500, freq: 28 },
  { bin: 3000, freq: 24 },
  { bin: 3500, freq: 20 },
  { bin: 4000, freq: 17 },
  { bin: 4500, freq: 14 },
  { bin: 5000, freq: 11 },
  { bin: 5500, freq: 9 },
  { bin: 6000, freq: 7 },
  { bin: 6500, freq: 5 },
  { bin: 7000, freq: 3 },
];

// 営業利益のダミーデータ（百万円単位、25単位のビン）
export const operatingProfitData: HistogramData[] = [
  { bin: 25, freq: 58 },
  { bin: 50, freq: 52 },
  { bin: 75, freq: 47 },
  { bin: 100, freq: 42 },
  { bin: 125, freq: 37 },
  { bin: 150, freq: 32 },
  { bin: 175, freq: 28 },
  { bin: 200, freq: 24 },
  { bin: 225, freq: 20 },
  { bin: 250, freq: 17 },
  { bin: 275, freq: 14 },
  { bin: 300, freq: 12 },
  { bin: 325, freq: 9 },
  { bin: 350, freq: 7 },
  { bin: 375, freq: 5 },
  { bin: 400, freq: 3 },
];

// 法人税のダミーデータ（百万円単位、5単位のビン）
export const corporateTaxData: HistogramData[] = [
  { bin: 5, freq: 64 },
  { bin: 10, freq: 58 },
  { bin: 15, freq: 53 },
  { bin: 20, freq: 48 },
  { bin: 25, freq: 43 },
  { bin: 30, freq: 38 },
  { bin: 35, freq: 34 },
  { bin: 40, freq: 30 },
  { bin: 45, freq: 26 },
  { bin: 50, freq: 23 },
  { bin: 55, freq: 20 },
  { bin: 60, freq: 17 },
  { bin: 65, freq: 14 },
  { bin: 70, freq: 12 },
  { bin: 75, freq: 9 },
  { bin: 80, freq: 7 },
  { bin: 85, freq: 5 },
  { bin: 90, freq: 3 },
];

// 1株あたり利益のダミーデータ（円単位、25円のビン）
export const earningsPerShareData: HistogramData[] = [
  { bin: 25, freq: 68 },
  { bin: 50, freq: 62 },
  { bin: 75, freq: 56 },
  { bin: 100, freq: 51 },
  { bin: 125, freq: 46 },
  { bin: 150, freq: 41 },
  { bin: 175, freq: 36 },
  { bin: 200, freq: 32 },
  { bin: 225, freq: 28 },
  { bin: 250, freq: 24 },
  { bin: 275, freq: 21 },
  { bin: 300, freq: 18 },
  { bin: 325, freq: 15 },
  { bin: 350, freq: 13 },
  { bin: 375, freq: 10 },
  { bin: 400, freq: 8 },
  { bin: 425, freq: 6 },
  { bin: 450, freq: 4 },
  { bin: 475, freq: 2 },
];