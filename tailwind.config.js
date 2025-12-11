/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        shimmer: 'shimmer 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-border': 'spin 4s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'bounce-vertical': 'bounce-vertical 1s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(147, 51, 234, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'bounce-vertical': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-3px)' },
          '75%': { transform: 'translateY(3px)' },
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: 'rgba(var(--primary-50), <alpha-value>)',
          100: 'rgba(var(--primary-100), <alpha-value>)',
          200: 'rgba(var(--primary-200), <alpha-value>)',
          300: 'rgba(var(--primary-300), <alpha-value>)',
          400: 'rgba(var(--primary-400), <alpha-value>)',
          500: 'rgba(var(--primary-500), <alpha-value>)',
          600: 'rgba(var(--primary-600), <alpha-value>)',
          700: 'rgba(var(--primary-700), <alpha-value>)',
          800: 'rgba(var(--primary-800), <alpha-value>)',
          900: 'rgba(var(--primary-900), <alpha-value>)',
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 20px rgba(147, 51, 234, 0.3)',
        'glow-lg': '0 0 40px rgba(147, 51, 234, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(147, 51, 234, 0.2)',
      },
    },
  },
  plugins: [],
};
