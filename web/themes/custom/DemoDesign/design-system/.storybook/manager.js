import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'DesignDemo',
    colorSecondary: '#a2a9b1'
  })
})

addons.setConfig({
  selectedPanel: 'addon-controls'
})
