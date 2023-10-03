import { html, css, unsafeCSS } from 'lit-element'

import { Component } from '../Component'

import cssFile from './task.css'

export class Task extends Component {
  static get properties () {
    return {
      title: { type: String },
      completed: { type: Boolean }
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

  handleClick (e) {
    this.dispatchEvent(new CustomEvent('task-click', { detail: !this.completed, bubbles: true }))
    console.log('EVENT: task-click')
    e.preventDefault()
  }

  render () {
    // label and input type checkbox
    return html`
      ${Component.baseStyles}
      <label class="task">
        <input type="checkbox" ?checked=${this.completed} @click=${this.handleClick} />
        <span class="checkmark"></span>
        ${this.title}
      </label>
    `
  }
}

customElements.define('dc-task', Task)
