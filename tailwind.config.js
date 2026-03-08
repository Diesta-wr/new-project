/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          bg: '#0f0f0f',
          card: '#1f1f1f',
          cardHover: '#2a2a2a',
          accent: '#2AABEE',
          accentHover: '#1d9bd1',
          text: '#ffffff',
          textSecondary: '#aaaaaa',
          border: 'rgba(42, 171, 238, 0.15)',
          online: '#31B545',
          gradientStart: '#8774E1',
          gradientEnd: '#2AABEE',
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}