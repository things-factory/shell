import { LitElement, html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../store'

class MorePanel extends connect(store)(LitElement) {
  static get properties() {
    return {
      _morendas: Array
    }
  }

  render() {
    return html`
      ${this._morendas.map(
        morenda => html`
          <div @click=${morenda.action}>${morenda.name}</div>
        `
      )}
    `
  }

  stateChanged(state) {
    this._morendas = state.more.morendas
  }
}

customElements.define('more-panel', MorePanel)
