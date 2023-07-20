const tailwindConfig = require('./design-system/tailwind.config.js')

module.exports = {
  ...tailwindConfig,
  purge: {
    layers: ['components', 'utilities'],
    content: ['./templates/**/*.twig']
  }
}
