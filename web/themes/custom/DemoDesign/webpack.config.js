const path = require('path')
const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { DrupalLibrariesPlugin } = require('drupal-libraries-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const WebpackCmdShellPlugin = require('webpack-cmd-shell-plugin')
const { version: designSystemVersion } = require('./design-system/package.json')
const designSystemPath = './design-system'
const reactAppPath = './react-app'
const designSystemPathDist = `${designSystemPath}/dist`
const reactAppPathDist = `${reactAppPath}/dist`
const designSystemNamespace = 'Demo'
const themeName = 'DemoDesign'

const designSystemBase = ['vendor', 'runtime'].reduce((all, name) => {
  return {
    ...all,
    [`design-system/${name}`]: path.resolve(`${designSystemPathDist}/${name}.js`)
  }
}, {})

const customElements = require(`${designSystemPath}/custom-elements.json`)
const designSystemComponents = customElements.tags.reduce((all, tag) => {
  const tagName = tag.name
  const fileName = tagName.replace(`${designSystemNamespace}-`, '')
  const filePath = path.resolve(`${designSystemPathDist}/${fileName}.js`)

  return {
    ...all,
    [`design-system/${tagName}`]: filePath
  }
}, {})

const tailwindCss = {
  tailwind: './tailwind.css'
}

const styles = glob.sync('./src/css/**/*.css').reduce((all, name) => {
  const nameParts = name.split('/')
  const entryName = nameParts[nameParts.length - 1]
  const [fileName] = entryName.split('.')

  return {
    ...all,
    [fileName]: name
  }
}, {})

const scripts = glob.sync('./src/js/**/*.js').reduce((all, name) => {
  const nameParts = name.split('/')
  const entryName = nameParts[nameParts.length - 1]
  const [fileName] = entryName.split('.')

  return {
    ...all,
    [`js/${fileName}`]: name
  }
}, {})

module.exports = {
  entry: {
    ...designSystemBase,
    ...designSystemComponents,
    ...tailwindCss,
    ...styles,
    ...scripts
  },
  output: {
    path: path.resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /design-system/,
        use: [
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
        exclude: /tailwind.css/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].[ext]',
              esModule: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /tailwind.css/,
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
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: `${designSystemPathDist}/assets`, to: 'assets'
        },
        {
          from: `${reactAppPathDist}`, to: 'todo-app'
        }
      ]
    }),
    new DrupalLibrariesPlugin({
      path: 'dist/design-system.libraries.yml',
      prepareFile: (file, compiler, compilation) => {
        const newFileContent = Object.keys(file.content).reduce((all, library) => {
          // Skip libraries that are not from design system
          if (library.indexOf('design-system') === -1) {
            return all
          }

          // Clean-up library name
          const newLibraryName = library.replace('design-system-', '')

          // Mark JS files as minified
          // @TODO: Fix "minified" output in generated libraries file
          const libraryContent = file.content[library]
          const jsFile = Object.keys(libraryContent.js)[0]
          const jsFilePath = `dist/${jsFile}`
          libraryContent.js = {
            [jsFilePath]: { minified: true }
          }

          return {
            ...all,
            [newLibraryName]: libraryContent
          }
        }, {})

        file.content = newFileContent

        // Setting proper dependencies for all components
        for (var lib in file.content) {
          const excludedLibs = [
            'runtime',
            'vendor',
            'polyfills'
          ]
          file.content[lib].version = designSystemVersion

          // Add vendor.js and runtime by setting "core" as dependency
          if (!excludedLibs.includes(lib)) {
            file.content[lib].dependencies = [`${themeName}/core`]
          }
        }

        return DrupalLibrariesPlugin.defaults.prepareFile(file, compiler, compilation)
      }
    }),
    new WebpackCmdShellPlugin({
      enforceOrder: true,
      beforeStart: 'echo "# Do not edit this file, edit \"DemoDesign.base.libraries.yml\" instead." > DemoDesign.libraries.yml',
      whenDone: 'cat dist/design-system.libraries.yml DemoDesign.base.libraries.yml >> DemoDesign.libraries.yml',
    }),
    new FixStyleOnlyEntriesPlugin()
  ]
}
