import { html, LitElement } from 'lit-element'

import '../layouts/page-toolbar'
import { PageView } from '../layouts/page-view'

import { SharedStyles } from '../styles/shared-styles'

class Page404 extends PageView {
  static get styles() {
    return [SharedStyles]
  }

  render() {
    return html`
      <page-toolbar></page-toolbar>

      <section>
        page not found (Page-404)
      </section>
    `
  }
}

window.customElements.define('page-404', Page404)
