import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

export class OopsNote extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `
  }

  static get properties() {
    return {
      icon: String,
      title: String,
      description: String
    }
  }

  render() {
    return html`
      <mwc-icon>${this.icon}</mwc-icon>
      <div title>${this.title}</div>
      <div description>${this.description}</div>
    `
  }
}

customElements.define('oops-note', OopsNote)
