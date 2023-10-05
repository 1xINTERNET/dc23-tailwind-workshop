const tailwindConfig = require('./design-system/tailwind.config.js')

module.exports = {
  presets: [tailwindConfig],
  content: ['./templates/**/*.twig', './react-app/src/**/*.{js,jsx,ts,tsx}'],
}
