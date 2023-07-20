import { html, nothing } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

import { sanitizeHTML } from '../../utils'

import './DcImageText'

import demoBildTextImage from '../../assets/images/demo/demo.png'

const demoImage = `<article slot="media"><img src=${demoBildTextImage}></article>`

const Template = ({ title, slotMedia, slotDefault }) => html`
  <dc-image-text title=${ifDefined(title)}>
    ${slotMedia ? unsafeHTML(sanitizeHTML(slotMedia)) : nothing}
    ${slotDefault ? unsafeHTML(sanitizeHTML(slotDefault)) : nothing}
  </dc-image-text>
`

export const Default = Template.bind({})
Default.args = {
  slotMedia: demoImage,
  slotDefault: '<div class="eyebrow">EyeBrow</div><h3>Title</h3><h5>Categorie</h5> this is a text'
}

export default {
  title: 'Molecules/Image Text',
  component: 'dc-image-text',
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
