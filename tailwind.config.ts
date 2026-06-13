import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#111111',
        border: '#1A1A1A',
        'text-primary': '#F5F5F5',
        'text-muted': '#666666',
        accent: '#C8FF00',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(64px, 10vw, 160px)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-sm': ['clamp(48px, 7vw, 110px)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'heading': ['clamp(36px, 5vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'float-slow': 'float 6s ease-in-out 0.8s infinite',
      },
    },
  },
  plugins: [],
}

export default config
