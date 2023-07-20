const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const componentList = glob.sync('./src/components/**/*.js*', {
  ignore: ['./**/*.stories.js', './**/Component.js']
})

const components = componentList.reduce((all, name) => {
  const nameParts = name.split('/')
  const entryName = nameParts[nameParts.length - 1]
  const entryNameNoExt = entryName.slice(0, -3)
  const dashCased = entryNameNoExt.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

  return {
    ...all,
    [dashCased]: name
  }
}, {})

const styles = {
  tailwind: './src/tailwind.css'
}

const polyfills = {
  polyfills: './src/polyfills.js'
}

module.exports = {
  entry: {
    ...components,
    ...styles,
    ...polyfills
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](?!@webcomponents)/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'import-glob',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: '3.8',
                    targets: {
                      ie: '11'
                    },
                    useBuiltIns: 'entry'
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'raw-loader',
          'postcss-loader'
        ]
      },
      {
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
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ]
}
