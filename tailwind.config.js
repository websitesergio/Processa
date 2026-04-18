/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warmMidnight: '#080705',
        warmIvory: '#F5F2EC',
        parchmentGold: '#D4A853',
        inkBlue: '#1D4ED8',
        ash: 'rgba(245, 242, 236, 0.55)',
        rule: 'rgba(245, 242, 236, 0.12)',
        trustBlue: '#1d4ed8',
        clinicalGrey: '#f8fafc',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.02em',
        widest: '0.28em',
      },
      lineHeight: {
        heading: '1.1',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
