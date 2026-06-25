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
        accent: {
          DEFAULT: '#FF6B00',
          hover: '#E55F00',
          light: '#FFF0E6',
        },
        'bg-primary': '#F8F8F8',
        'bg-surface': '#FFFFFF',
        'bg-dark': '#1A1A1A',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        success: '#00C853',
        error: '#E53935',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
        badge: '4px',
        modal: '16px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
