module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Rich hazelnut browns
        hazel: {
          50:  '#faf7f4',
          100: '#f3ece4',
          200: '#e6d5c3',
          300: '#d4b89a',
          400: '#c19a72',
          500: '#a67b50',
          600: '#8c6340',
          700: '#6f4d32',
          800: '#573b27',
          900: '#3e2a1c',
          950: '#2a1b11',
        },
        // Creamy beiges
        cream: {
          50:  '#fefcf9',
          100: '#fdf8f0',
          200: '#faf0e0',
          300: '#f5e4cc',
          400: '#eed5b2',
          500: '#e5c49a',
          600: '#d4a872',
          700: '#b8874f',
          800: '#8c6539',
          900: '#614529',
        },
        // Forest greens
        forest: {
          50:  '#f2f7f3',
          100: '#e0ede2',
          200: '#bfdbc5',
          300: '#96c4a0',
          400: '#6aab78',
          500: '#4a915c',
          600: '#3a7549',
          700: '#2f5d3b',
          800: '#274b31',
          900: '#1f3d28',
          950: '#122318',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    }
  },
  plugins: []
}
