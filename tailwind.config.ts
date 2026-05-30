import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        viore: {
          'bg': '#FBFAF7',
          'surface': '#F5F4F0',
          'surface-2': '#EDECEA',
          'border': 'rgba(0,0,0,0.06)',
          'border-strong': 'rgba(0,0,0,0.10)',
          'text': '#1C1C1E',
          'muted': '#6E6E73',
          'faint': '#AEAEB2',
          'teal': '#0E6E6E',
          'teal-mid': '#1A8A8A',
          'teal-light': '#E5F2F2',
          'teal-lighter': '#F0F8F8',
          'crimson': '#B53A3A',
          'crimson-light': '#F9EDED',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.025em',
        label: '0.1em',
      },
    },
  },
  plugins: [],
} satisfies Config