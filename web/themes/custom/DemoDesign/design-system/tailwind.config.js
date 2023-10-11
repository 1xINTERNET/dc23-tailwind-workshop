const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './components/**/*.{js,css}'
  ],
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
      xs: '12rem',
      30: '30%'
    },
    minHeight: {
      md: '18rem'
    },
    backgroundImage: {
      'colored-line': "url('/themes/custom/DemoDesign/assets/colored-line.jpg')",
      'todo-paragraph': "url('/themes/custom/DemoDesign/assets/triangle-background.png')"
    }
  },
  plugins: []
}
