import { html, css, unsafeCSS } from 'lit-element'

import { Component } from '../Component'

import cssFile from './headline.css'

export class Headline extends Component {
  static get properties () {
    return {
      level: { type: String, default: 'h1' },
      pretext: { type: String, default: '' }
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

  setupHeadline () {
    const { level } = this
    const headline = document.createElement(level)
    headline.innerHTML = '<slot></slot>'
    const container = this.shadowRoot.querySelector('.headline-container')
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    container.appendChild(headline)
  }

  firstUpdated () {
    this.setupHeadline()
  }

  updated () {
    this.setupHeadline()
  }

  render () {
    return html`
      ${Component.baseStyles}
      <div class="headline-pretext">${this.pretext}</div>
      <div class="headline-container">
      </div>
    `
  }
}

customElements.define('dc-headline', Headline)
