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
      },
    },
  },
  plugins: [],
}