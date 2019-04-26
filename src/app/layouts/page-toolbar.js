import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../store'

class PageToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {}
  }

  static get styles() {
    return []
  }

  render() {
    return html``
  }

  stateChanged(state) {}
}

customElements.define('page-toolbar', PageToolbar)
