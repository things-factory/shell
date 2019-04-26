import { html } from 'lit-element'

import { PageView } from '../layouts/page-view'

import { SharedStyles } from '../styles/shared-styles'

class Page404 extends PageView {
  static get styles() {
    return [SharedStyles]
  }

  get tools() {
    return html`
      <label>Page Not Found</label>
    `
  }

  render() {
    return html`
      <section>
        page not found (Page-404)
      </section>
    `
  }
}

window.customElements.define('page-404', Page404)
