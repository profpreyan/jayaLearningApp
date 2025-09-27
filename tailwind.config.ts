import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#E10600',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
export default config
