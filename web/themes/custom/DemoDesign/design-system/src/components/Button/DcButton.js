import { html, css, unsafeCSS } from 'lit-element'

import { Component } from '../Component'

import cssFile from './button.css'

export class Button extends Component {
  static get properties () {
    return {
      color: { type: String },
      disabled: { type: Boolean },
      onClick: { type: Function },
      outline: { type: Boolean },
      slotDefault: { type: String },
      link: { type: String }
    }
  }

  static get styles () {
    return [
      ...Component.styles,
      css`
        ${unsafeCSS(cssFile)}
      `
    ]
  }

  handleClick (event) {
    if (this.disabled) {
      event.stopImmediatePropagation()
    } else if (this.link) {
      window.location.href = this.link
    } else if (typeof this.onClick === 'function') {
      this.onClick()
    }
  }

  render () {
    const { disabled } = this

    return html`
      ${Component.baseStyles}
      <button ?disabled=${disabled}>
        <slot></slot>
      </button>
    `
  }
}

customElements.define('dc-button', Button)
