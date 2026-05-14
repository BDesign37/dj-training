/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#07050f',
        sidebar: '#0c0a18',
        card: '#110f1e',
        card2: '#161325',
        card3: '#1c1830',
        gold: { DEFAULT: '#c9a84c', light: '#e8c97a' },
        accent: { purple: '#9b6de0', blue: '#5b9bd5', pink: '#d45b8a' },
        teal: '#5bcfb0',
        border: { DEFAULT: '#1e1a30', strong: '#2a2444' },
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
