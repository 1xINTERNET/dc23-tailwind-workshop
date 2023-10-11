import { LitElement, html } from 'lit-element'

export class Component extends LitElement {
  static get baseStyles () {
    const baseUrl = window.baseUrlStyles ?? 'tailwind.css'
    return html`<link rel="stylesheet" href="${baseUrl}" />`
  }

  static get styles () {
    return []
  }

  render () {
    return html`<slot></slot>`
  }
}
