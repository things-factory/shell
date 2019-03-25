import { html, LitElement } from 'lit-element'

import { SharedStyles } from '../styles/shared-styles'

class MyPage404 extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <section>
        page not found
      </section>
    `
  }
}

window.customElements.define('my-page404', MyPage404)
