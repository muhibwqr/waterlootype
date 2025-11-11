import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--bg-primary))',
        foreground: 'hsl(var(--text-primary))',
        muted: {
          DEFAULT: 'hsl(var(--text-muted))',
          foreground: 'hsl(var(--text-secondary))',
        },
        border: 'hsl(var(--border-default))',
        input: 'hsl(var(--border-default))',
        ring: 'hsl(var(--gold-primary))',
        primary: {
          DEFAULT: 'hsl(var(--gold-primary))',
          foreground: '#1a1a1a',
        },
        secondary: {
          DEFAULT: 'hsl(var(--bg-secondary))',
          foreground: 'hsl(var(--text-secondary))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-blue))',
          foreground: '#0a0a0a',
        },
        success: {
          DEFAULT: 'hsl(var(--accent-green))',
          foreground: '#0a0a0a',
        },
        danger: {
          DEFAULT: 'hsl(var(--accent-red))',
          foreground: '#0a0a0a',
        },
        card: {
          DEFAULT: 'hsl(var(--bg-tertiary))',
          foreground: 'hsl(var(--text-primary))',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold-primary))',
          hover: 'hsl(var(--gold-hover))',
          muted: 'hsl(var(--gold-muted))',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
        xl: '24px',
        full: '999px',
      },
      boxShadow: {
        gold: 'var(--shadow-gold)',
        'card-lg': '0 30px 80px rgba(0,0,0,0.45)',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.1', transform: 'scale(1)' },
          '50%': { opacity: '0.2', transform: 'scale(1.1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 3s ease infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease forwards',
      },
      backgroundImage: {
        'noise-overlay':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [tailwindAnimate],
}

export default config

