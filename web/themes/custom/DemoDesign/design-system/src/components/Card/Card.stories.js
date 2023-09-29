import { html, nothing } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

import { sanitizeHTML } from '../../utils'

import './DcCard'

import demoCardImage from '../../assets/images/demo/demo.png'

const demoImage = `
<div slot="media">
  <img loading="lazy" data-sizes="auto"
  style="border-radius: 9999px; width: -webkit-fill-available;"
  src="${demoCardImage}" alt="Cat"
  >
</div>`

const Template = ({
  variant,
  label,
  slotMedia,
  slotDefault,
  slotAction,
  hasAction,
  highlight
}) => html`
  <div style="max-width:400px;">
    <dc-card
      highlight=${ifDefined(highlight)}
      variant=${ifDefined(variant)}
      label=${ifDefined(label)}
      ?has-action=${ifDefined(hasAction)}
    >
      ${slotMedia ? unsafeHTML(sanitizeHTML(slotMedia)) : nothing}
      ${slotDefault ? unsafeHTML(sanitizeHTML(slotDefault)) : nothing}
      ${slotAction && hasAction
        ? unsafeHTML(sanitizeHTML(slotAction))
        : nothing}
    </dc-card>
  </div>
`

export const Default = Template.bind({})
Default.args = {
  slotMedia: demoImage,
  label: 'H4 - Heading 4',
  hasAction: true,
  slotDefault: '<p>SOME TEXT</p>',
  slotAction:
    '<dc-button secondary not-rounded slot="action" href="#">＋</dc-button>'
}

export const Compact = Template.bind({})
Compact.args = {
  variant: 'compact',
  slotDefault: '<span>September</span>',
  label: '20-23'
}

export const CompactHighlight = Template.bind({})
CompactHighlight.args = {
  variant: 'compact',
  slotDefault: '<span>September</span>',
  label: '20-23',
  highlight: true
}
export default {
  title: 'Molecules/Card',
  component: 'dc-card',
  argTypes: {
    slotMedia: {
      description: 'Slot for image.',
      table: {
        category: 'slots'
      },
      type: {
        summary: 'string'
      },
      control: 'text'
    }
  }
}
