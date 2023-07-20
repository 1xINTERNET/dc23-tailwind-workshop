import { html, css, unsafeCSS } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { Component } from '../Component';

import cssFile from './headline.css';

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

  render () {
    const { level } = this

    const heading = `
      <${level}>
        <slot></slot>
      </${level}>
    `

    return html`
      ${Component.baseStyles}
      <div class="headline-pretext">${this.pretext}</div>
      <div class="headline-container">
        ${unsafeHTML(heading)}
      </div>
    `
  }
}

customElements.define('dc-headline', Headline)
