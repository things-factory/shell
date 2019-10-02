import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

export class OopsNote extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
      }
      mwc-icon {
        font: var(--oops-note-icon-font);
        color: var(--oops-note-icon-color);
        border: var(--oops-note-icon-border);
        border-radius: var(--oops-note-icon-border-radius);
        padding: var(--oops-note-icon-padding);
      }
      [title] {
        margin: var(--oops-note-title-margin);
        font: var(--oops-note-title-font);
        color: var(--oops-note-title-color);
        text-transform: capitalize;
      }
      [description] {
        font: var(--oops-note-description-font);
        color: var(--oops-note-description-color);
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
