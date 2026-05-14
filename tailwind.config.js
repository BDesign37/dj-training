/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#121113',
        surface: '#191819',
        sidebar: '#0f0e10',
        card: '#191819',
        card2: '#1f1e20',
        card3: '#252326',
        gold: { DEFAULT: '#FFCF56', light: '#FFE08A' },
        accent: { purple: '#9b6de0', blue: '#5b9bd5', pink: '#d45b8a' },
        teal: '#5bcfb0',
        border: { DEFAULT: '#242226', strong: '#2e2b32' },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        crimson: ['"Crimson Text"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
