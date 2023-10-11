const tailwindConfig = require("./design-system/tailwind.config.js");

module.exports = {
  presets: [tailwindConfig],
  content: [
    "./design-system/src/**/*.{js,ts,css}",
    "./react-app/src/**/*.{js,jsx,ts,tsx}",
    "./templates/**/*.twig",
  ],
};
