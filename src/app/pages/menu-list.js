import { html, LitElement } from 'lit-element'

import { SharedStyles } from '../styles/shared-styles'

class MenuList extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <section>
        <h2>Menu List</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>

        <a href="/form">Form</a>| <a href="/board">Board</a>| <a href="/player">Player</a>|
        <a href="/report">Report</a>
      </section>
    `
  }
}

window.customElements.define('menu-list', MenuList)
