import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: { 900: 'var(--pine-900)' },
        lake: { 700: 'var(--lake-700)' },
        birch: { 100: 'var(--birch-100)' },
        amber: { 500: 'var(--amber-500)' },
        ink: { 900: 'var(--ink-900)' },
        mist: { 200: 'var(--mist-200)' },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-work)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.05' }],
        h2: ['2.25rem', { lineHeight: '1.15' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
        lead: ['1.125rem', { lineHeight: '1.65' }],
      },
    },
  },
  plugins: [],
}
export default config
