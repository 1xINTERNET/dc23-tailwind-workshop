import { html, nothing } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

import { sanitizeHTML } from '../../utils'

import './DcButton'

const Template = ({
  disabled,
  outline,
  slotDefault,
  secondary,
  notRounded
}) => html`
  <dc-button ?disabled=${ifDefined(disabled)} ?outline=${ifDefined(outline)} ?secondary=${ifDefined(secondary)}
    ?not-rounded=${ifDefined(notRounded)}>
    ${slotDefault ? unsafeHTML(sanitizeHTML(slotDefault)) : nothing}
  </dc-button>
`

export const Default = Template.bind({})
Default.args = {
  slotDefault: 'Button'
}

export const Outline = Template.bind({})
Outline.args = {
  slotDefault: 'Button',
  outline: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  slotDefault: 'Button',
  secondary: true
}

export const NotRounded = Template.bind({})
NotRounded.args = {
  slotDefault: '+',
  secondary: true,
  notRounded: true
}

const DisabledTemplate = () => html`
  <div class="space-x-1">
    <br />
    <dc-button disabled>
      Disabled
    </dc-button>
    <dc-button disabled outline>
      Outline disabled
    </dc-button>
  </div>
`

export const Disabled = DisabledTemplate.bind({})
Disabled.args = {}

export default {
  title: 'Atoms/Buttons/Button',
  component: 'dc-button',
  argTypes: {
    color: {
      table: {
        category: 'attributes'
      },
      description: 'The background color of the button',
      type: {
        summary: 'string'
      },
      control: {
        type: 'select',
        options: {
          'Default (brand)': undefined
        }
      }
    },
    outline: {
      table: {
        category: 'attributes'
      },
      description: 'Whether the button is the outline variant',
      defaultValue: false,
      type: {
        summary: 'boolean'
      },
      control: 'boolean'
    },
    disabled: {
      table: {
        category: 'attributes'
      },
      description: 'Whether the button should be disabled',
      defaultValue: false,
      type: {
        summary: 'boolean'
      },
      control: 'boolean'
    }
  }
}
