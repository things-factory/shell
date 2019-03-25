import { html, LitElement } from 'lit-element'

import { SharedStyles } from '../styles/shared-styles'

class MyPage2 extends LitElement {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <section>
        <h2>Static page 2</h2>
      </section>
      <button
        id="request-button"
        @click=${e => {
          fetch('http://board-demo.hatiolab.com/rest/scenes', {
            credentials: 'include'
          }).then(response => {
            if (!response.ok)
              this.dispatchEvent(
                new CustomEvent('authentication-required', {
                  bubbles: true,
                  composed: true
                })
              )
          })
        }}
      >
        요청
      </button>
    `
  }
}

window.customElements.define('my-page2', MyPage2)
