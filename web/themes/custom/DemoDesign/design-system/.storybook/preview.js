import { configure, setCustomElements } from '@storybook/web-components'
import customElements from '../custom-elements.json'

setCustomElements(customElements)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  html: {
    prettier: {
      tabWidth: 2,
      useTabs: false,
      printWidth: 140,
      htmlWhitespaceSensitivity: 'ignore'
    },
    root: '#root-inner',
    removeEmptyComments: true,
    highlighter: {
      showLineNumbers: true,
      wrapLines: false
    }
  },

  options: {
    storySort: {
      order: ['Introduction', 'Icons', 'Atoms', 'Molecules', 'Organisms', 'Layouts', 'Mockups']
    }
  },
  a11y: {
    element: '#root-inner > *'
  }
}

// force full reload to not reregister web components
const req = require.context('../src/components', true, /\.stories\.(js|mdx)$/)

configure(req, module)

if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href
    window.history.pushState(null, null, currentLocationHref)
    window.location.reload()
  })
}
