/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          25: '#f8fafc',
        },
        emerald: {
          25: '#f0fdf4',
        },
        purple: {
          25: '#faf5ff',
        },
        // 金融業界らしい深いブルー系のブランドカラー
        financial: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af',  // メインブランドカラー
          700: '#1e3a8a',
          800: '#1e3a8a',
          900: '#1e40af',
        },
      },
    },
  },
  plugins: [],
}