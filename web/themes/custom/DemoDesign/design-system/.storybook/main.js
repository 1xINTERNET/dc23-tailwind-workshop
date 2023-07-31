module.exports = {
  stories: [
    '../src/components/*/*.stories.@(js|jsx)',
    '../src/docs/*/*.stories.mdx'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true }
    },
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    'storybook-addon-themes'
  ]
}
