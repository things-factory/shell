import { html, LitElement } from 'lit-element'

import { SharedStyles } from '../styles/shared-styles'

class FormViewer extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <section>
        <h2>Form Viewer</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
    `
  }
}

window.customElements.define('form-viewer', FormViewer)
