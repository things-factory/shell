import { html, LitElement } from 'lit-element'

import '../layouts/page-toolbar'

import { SharedStyles } from '../styles/shared-styles'

class BoardViewer extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <page-toolbar></page-toolbar>

      <section>
        <h2>Board Viewer</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
    `
  }
}

window.customElements.define('board-viewer', BoardViewer)