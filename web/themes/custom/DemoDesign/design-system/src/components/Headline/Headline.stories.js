import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { sanitizeHTML } from '../../utils';

import './DcHeadline';

const Template = ({ slotDefault, level, align }) => html`
  <dc-headline
    pretext="Pretext test"
    level=${ifDefined(level)}
    align=${ifDefined(align)}
  >
    ${slotDefault ? unsafeHTML(sanitizeHTML(slotDefault)) : nothing}
  </dc-headline>
`

export const Default = Template.bind({})
Default.args = {
  slotDefault: 'Heading level 1',
  level: 'h1'
}

export const Heading2 = Template.bind({})
Heading2.args = {
  slotDefault: 'Heading level 2',
  level: 'h2'
}

export const AlignCenter = Template.bind({})
AlignCenter.args = {
  slotDefault: 'Heading level 1',
  level: 'h1',
  align: 'center'
}

export default {
  title: 'Atoms/Headline',
  component: 'dc-headline',
  argTypes: {
    level: {
      name: 'level',
      table: {
        category: 'attributes'
      },
      description: 'Heading level',
      type: {
        summary: 'string'
      },
      control: {
        type: 'select',
        options: {
          H1: 'h1',
          H2: 'h2',
          H3: 'h3',
          H4: 'h4',
          H5: 'h5',
          H6: 'h6'
        }
      }
    }
  }
}
