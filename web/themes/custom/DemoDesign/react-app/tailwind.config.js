/** @type {import('tailwindcss').Config} */

import tailwindConfig from '../design-system/tailwind.config.js'

export default {
  presets: [tailwindConfig],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}



