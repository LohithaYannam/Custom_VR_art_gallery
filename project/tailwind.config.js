/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary), 0.05)',
          100: 'rgb(var(--color-primary), 0.1)',
          200: 'rgb(var(--color-primary), 0.2)',
          300: 'rgb(var(--color-primary), 0.3)',
          400: 'rgb(var(--color-primary), 0.4)',
          500: 'rgb(var(--color-primary), 0.6)',
          600: 'rgb(var(--color-primary), 0.7)',
          700: 'rgb(var(--color-primary), 0.8)',
          800: 'rgb(var(--color-primary), 0.9)',
          900: 'rgb(var(--color-primary), 1)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary), 0.05)',
          100: 'rgb(var(--color-secondary), 0.1)',
          200: 'rgb(var(--color-secondary), 0.2)',
          300: 'rgb(var(--color-secondary), 0.3)',
          400: 'rgb(var(--color-secondary), 0.4)',
          500: 'rgb(var(--color-secondary), 0.6)',
          600: 'rgb(var(--color-secondary), 0.7)',
          700: 'rgb(var(--color-secondary), 0.8)',
          800: 'rgb(var(--color-secondary), 0.9)',
          900: 'rgb(var(--color-secondary), 1)',
        },
        accent: {
          50: 'rgb(var(--color-accent), 0.05)',
          100: 'rgb(var(--color-accent), 0.1)',
          200: 'rgb(var(--color-accent), 0.2)',
          300: 'rgb(var(--color-accent), 0.3)',
          400: 'rgb(var(--color-accent), 0.4)',
          500: 'rgb(var(--color-accent), 0.6)',
          600: 'rgb(var(--color-accent), 0.7)',
          700: 'rgb(var(--color-accent), 0.8)',
          800: 'rgb(var(--color-accent), 0.9)',
          900: 'rgb(var(--color-accent), 1)',
        },
        success: {
          500: 'rgb(var(--color-success), 0.6)',
          600: 'rgb(var(--color-success), 0.7)',
        },
        warning: {
          500: 'rgb(var(--color-warning), 0.6)',
          600: 'rgb(var(--color-warning), 0.7)',
        },
        error: {
          500: 'rgb(var(--color-error), 0.6)',
          600: 'rgb(var(--color-error), 0.7)',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};