export interface HistogramData {
  bin: number;
  freq: number;
  binEnd?: number; // 区間終了値（新形式CSVの場合）
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
          // bin_startをbin、bin_endをbinEndとして保存
          data.push({ bin: binStart, freq, binEnd });
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