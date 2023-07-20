

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-hexrgba'),
    require('postcss-preset-env'),
    ...process.env.NODE_ENV === 'production'
      ? [require('cssnano')]
      : []
  ]
}
