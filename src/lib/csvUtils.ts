export interface HistogramData {
  bin: number;
  freq: number;
  binEnd?: number; // 区間終了値（新形式CSVの場合）
}

export interface StatisticsData {
  num: number;    // サンプル数
  avg: number;    // 平均値
  med: number;    // 中央値
  min: number;    // 最小値
  max: number;    // 最大値
}

export function parseCSV(csvText: string): HistogramData[] {
  const lines = csvText.trim().split('\n');
  const header = lines[0];
  
  // 新しいCSV形式（bin_start, bin_end, frequency）または旧形式（bin, freq）をサポート
  const isNewFormat = header.includes('bin_start') && header.includes('bin_end') && header.includes('frequency');
  const isOldFormat = header.includes('bin') && header.includes('freq');
  
  if (!isNewFormat && !isOldFormat) {
    throw new Error('CSVファイルの形式が認識できません');
  }
  
  const data: HistogramData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = line.split(',');
      
      if (isNewFormat) {
        // 新形式: bin_start, bin_end, frequency
        const binStart = parseInt(values[0], 10);
        const binEnd = parseInt(values[1], 10);
        const freq = parseInt(values[2], 10);
        
        if (!isNaN(binStart) && !isNaN(binEnd) && !isNaN(freq)) {
          // bin_startとbin_endの値を正規化（常にminがbin、maxがbinEndになるよう調整）
          const minBin = Math.min(binStart, binEnd);
          const maxBin = Math.max(binStart, binEnd);
          data.push({ bin: minBin, freq, binEnd: maxBin });
        }
      } else {
        // 旧形式: bin, freq
        const bin = parseInt(values[0], 10);
        const freq = parseInt(values[1], 10);
        
        if (!isNaN(bin) && !isNaN(freq)) {
          data.push({ bin, freq });
        }
      }
    }
  }
  
  return data;
}

export function parseStatisticsCSV(csvText: string): StatisticsData {
  const lines = csvText.trim().split('\n');
  const header = lines[0];
  
  if (!header.includes('num') || !header.includes('avg') || !header.includes('med') || !header.includes('min') || !header.includes('max')) {
    throw new Error('統計CSVファイルの形式が認識できません');
  }
  
  if (lines.length < 2) {
    throw new Error('統計データが見つかりません');
  }
  
  const values = lines[1].split(',');
  const num = parseInt(values[0], 10);
  const avg = parseFloat(values[1]);
  const med = parseFloat(values[2]);
  const min = parseFloat(values[3]);
  const max = parseFloat(values[4]);
  
  if (isNaN(num) || isNaN(avg) || isNaN(med) || isNaN(min) || isNaN(max)) {
    throw new Error('統計データの解析に失敗しました');
  }
  
  return { num, avg, med, min, max };
}

export async function loadCSVFromFile(filePath: string): Promise<HistogramData[]> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('CSVファイルの読み込みに失敗しました:', error);
    throw error;
  }
}

export async function loadStatisticsFromFile(filePath: string): Promise<StatisticsData> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const csvText = await response.text();
    return parseStatisticsCSV(csvText);
  } catch (error) {
    console.error('統計CSVファイルの読み込みに失敗しました:', error);
    throw error;
  }
}

// ヒストグラムデータを指定されたビンサイズで再集約する関数
export function aggregateHistogramData(data: HistogramData[], targetBinSize: number): HistogramData[] {
  if (data.length === 0) return [];
  
  // データを開始値でソート
  const sortedData = [...data].sort((a, b) => a.bin - b.bin);
  
  // 最小値を基準にビンの境界を決定
  const minValue = sortedData[0].bin;
  const binStart = Math.floor(minValue / targetBinSize) * targetBinSize;
  
  // 集約用のマップ
  const aggregatedMap = new Map<number, number>();
  
  // 各データポイントを適切なビンに集約
  for (const item of sortedData) {
    // このデータポイントが属すべきビンの開始値を計算
    const binIndex = Math.floor((item.bin - binStart) / targetBinSize);
    const aggregatedBinStart = binStart + binIndex * targetBinSize;
    
    // 既存の頻度に加算
    const currentFreq = aggregatedMap.get(aggregatedBinStart) || 0;
    aggregatedMap.set(aggregatedBinStart, currentFreq + item.freq);
  }
  
  // マップを配列に変換し、ソート
  const result: HistogramData[] = Array.from(aggregatedMap.entries())
    .map(([bin, freq]) => ({
      bin,
      freq,
      binEnd: bin + targetBinSize
    }))
    .sort((a, b) => a.bin - b.bin);
  
  return result;
}

// 新しいディレクトリ構造に対応した読み込み関数
export async function loadFactbookData(columnName: string, targetBinSize?: number): Promise<{
  histogram: HistogramData[];
  statistics: StatisticsData;
}> {
  try {
    const [rawHistogram, statistics] = await Promise.all([
      loadCSVFromFile(`/data/factbook/${columnName}/hist.csv`),
      loadStatisticsFromFile(`/data/factbook/${columnName}/stat.csv`)
    ]);
    
    // targetBinSizeが指定されている場合は、データを再集約
    const histogram = targetBinSize 
      ? aggregateHistogramData(rawHistogram, targetBinSize)
      : rawHistogram;
    
    return { histogram, statistics };
  } catch (error) {
    console.error(`ファクトブックデータの読み込みに失敗しました (${columnName}):`, error);
    throw error;
  }
}