import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryLight: 'var(--color-primary-light)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        apptext: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
      boxShadow: {
        soft: '0 18px 45px -28px rgba(15, 23, 42, 0.35)',
        glow: '0 12px 30px -18px rgba(59, 130, 246, 0.45)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Manrope', 'Aptos', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'Aptos', 'sans-serif'],
        mono: ['IBM Plex Mono', 'SFMono-Regular', 'monospace'],
        system: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s steps(1) infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('pointer-fine', '@media (hover: hover) and (pointer: fine)');
      addVariant('pointer-coarse', '@media (hover: none), (pointer: coarse)');
    }),
  ],
} satisfies Config;
