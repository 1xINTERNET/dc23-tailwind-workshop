const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = async ({ config, mode }) => {
  // We need to remove the default CSS related loader
  // so we have full control on CSS building
  config.module.rules = config.module.rules.filter((rule) => {
    return String(rule.test).indexOf('.css') === -1
  })

  // Remove SVG handling so we can use inline SVGs
  config.module.rules = config.module.rules.map((rule) => {
    const isSvg = String(rule.test).indexOf('svg') !== -1

    if (isSvg) {
      rule.test = String(rule.test).replace('svg|', '')
    }

    return rule
  })

  config.module.rules.push({
    test: /tailwind\.css$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          esModule: false,
          emit: true
        }
      },
      'postcss-loader'
    ],
    include: path.resolve(__dirname, '../')
  })

  config.module.rules.push({
    test: /\.css$/,
    exclude: /tailwind\.css$/,
    use: [
      'raw-loader',
      'postcss-loader'
    ],
    include: path.resolve(__dirname, '../')
  })

  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  })

  config.module.rules.push({
    test: /\.(jpg|png)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
          esModule: false,
          emit: true
        }
      }
    ]
  })

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: './assets' }
      ]
    })
  )

  // This is needed for SVG glob import
  config.module.rules.push({
    enforce: 'pre',
    test: /\.js/,
    loader: 'import-glob'
  })

  return config
}
