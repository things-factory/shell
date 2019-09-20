import { html } from 'lit-element'

import { PageView } from './page-view'

import { SharedStyles } from '../styles/shared-styles'

class Page404 extends PageView {
  static get styles() {
    return [SharedStyles]
  }

  get context() {
    return {
      title: 'Page Not Found'
    }
  }

  render() {
    return html`
      <section>
        page not found (Page-404)
      </section>
    `
  }
}

customElements.define('page-404', Page404)
