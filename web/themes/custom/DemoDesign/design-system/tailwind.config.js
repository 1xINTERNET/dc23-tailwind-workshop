const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#09547a',
          dark: '#213970',
          text: '#09547A'
        },
        secondary: '#E22B4B',
        white: '#FFFFFF',
        neutral: '#f3f3f0',
        card: '#E4EAEB'
      }
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
    },
    maxWidth: {
      xs: '12rem'
    }
  },
  plugins: []
}
