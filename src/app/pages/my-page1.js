import { html, LitElement } from 'lit-element'

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles'

class MyPage1 extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <section>
        <h2>Static page 1</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
    `
  }
}

window.customElements.define('my-page1', MyPage1)
