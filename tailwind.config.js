/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#121212',
        surface: '#181818',
        sidebar: '#000000',
        card: '#181818',
        card2: '#282828',
        card3: '#333333',
        green: { DEFAULT: '#1db954', light: '#1ed760' },
        accent: { purple: '#9b6de0', blue: '#5b9bd5', pink: '#d45b8a' },
        border: { DEFAULT: '#282828', strong: '#3e3e3e' },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', "'Cascadia Code'", "'Source Code Pro'", 'Menlo', 'Consolas', "'DejaVu Sans Mono'", 'monospace'],
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
}
