module.exports = {
  stories: ['../src/components/*/*.stories.@(js|jsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    },
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y',
    'storybook-addon-themes'
  ]
}
