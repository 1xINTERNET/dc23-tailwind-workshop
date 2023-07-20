import { LitElement, html, css, unsafeCSS } from 'lit-element'

import tailwindBase from '../tailwind.base.css'

export class Component extends LitElement {
  static get styles () {
    return [
      css`${unsafeCSS(tailwindBase)}`
    ]
  }

  render () {
    return html`<slot></slot>`
  }
}
