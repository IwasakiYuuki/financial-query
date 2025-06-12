// OG画像生成スクリプト（SVGからPNGへの変換用）
const fs = require('fs');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F9FAFB"/>
      <stop offset="1" stop-color="#EFF6FF"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#gradient)"/>
  
  <!-- Chart Icon -->
  <svg x="50" y="50" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="#2D72B8" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
  </svg>
  
  <!-- Title -->
  <text x="250" y="160" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#1F2A37">
    FinancialQuery
  </text>
  
  <!-- Subtitle -->
  <text x="50" y="300" font-family="Arial, sans-serif" font-size="48" fill="#374151">
    財務データの分布分析を財務諸表別に可視化
  </text>
  
  <!-- Description -->
  <text x="50" y="400" font-family="Arial, sans-serif" font-size="36" fill="#6B7280">
    損益・貸借対照表・キャッシュフロー計算書
  </text>
  
  <!-- Chart visualization -->
  <svg x="900" y="300" width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="#2569A6" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
  </svg>
</svg>
`;

fs.writeFileSync('./public/og-image.svg', svg);
console.log('OG画像SVGが作成されました。');