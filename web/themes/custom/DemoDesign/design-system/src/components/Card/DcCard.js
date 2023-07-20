import { html, css, unsafeCSS } from 'lit-element'
import { Component } from '../Component'

import cssFile from './card.css'

function titleTemplate (title) {
  return html`<h4 class="card__title">${title}</h4>`
}

function actionTemplate (hasAction) {
  return hasAction
    ? html`<div class="card__action">
  <slot name="action"></slot>
</div>`
    : ''
}

export class Card extends Component {
  static get properties () {
    return {
      hasAction: { type: Boolean, attribute: 'has-action' },
      label: { type: String },
      variant: { type: String }
    }
  }

  static get styles () {
    return [
      super.styles,
      css`${unsafeCSS(cssFile)}`
    ]
  }

  constructor () {
    super()
    this.hasAction = false
  }

  render () {
    const {
      hasAction,
      label,
      variant
    } = this

    let innerTemplate = ''

    switch (variant) {
      case 'compact':
        innerTemplate = html`
          <div class="card__content" part="card__content">
            ${titleTemplate(label)}
            <slot></slot>
          </div>
        `
        break

      default:
        innerTemplate = html`
          <div class="card__content" part="card__content">
            <slot></slot>
          </div>
          <div class="card__media">
            <div class="card__wrapper">
              <slot name="media"></slot>
            </div>
          </div>
          ${titleTemplate(label)}
          ${actionTemplate(hasAction)}
        `
        break
    }

    return html`
      ${Component.baseStyles}
      <div class="card">
        ${innerTemplate}
      </div>
    `
  }
}

customElements.define('dc-card', Card)
