module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')({ assetsPath: 'assets' }),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-hexrgba'),
    ...process.env.NODE_ENV === 'production'
      ? [require('cssnano')]
      : []
  ]
}
