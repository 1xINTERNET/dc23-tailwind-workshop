import { html, css, unsafeCSS } from 'lit-element'

import { Component } from '../Component'

import cssFile from './image-text.css'

export class ImageText extends Component {
  static get properties () {
    return {
      imageAlign: { type: String, attribute: 'image-align' }
    }
  }

  static get styles () {
    return [
      super.styles,
      css`${unsafeCSS(cssFile)}`
    ]
  }

  render () {
    const {
      variant,
      linkText,
      linkHref
    } = this

    return html`
      <div class="image-text">
        <div class="image-text__media">
          <slot name="media"></slot>
        </div>
        <div class="image-text__content">
          <slot></slot>
        </div>
      </div>
    `
  }
}

customElements.define('dc-image-text', ImageText)
