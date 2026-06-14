/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          dark: '#C2410C',
          light: '#FB923C',
        },
        dark: {
          DEFAULT: '#0F1117',
          2: '#1A1D27',
          3: '#242736',
        },
        surface: '#242736',
        accent: '#FBBF24',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        display: ['Bebas Neue', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F1117 0%, #1A1D27 50%, #0F1117 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(36,39,54,0.9) 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,115,22,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(249,115,22,0.6)' },
        },
      },
      boxShadow: {
        'orange-glow': '0 0 30px rgba(249, 115, 22, 0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
