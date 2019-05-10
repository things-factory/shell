import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { store } from '../store'
import { navigate, UPDATE_ACTIVE_PAGE } from '../actions/route'

import { AppTheme } from './styles/app-theme'
import { AppStyle } from './app-style'
import { TOGGLE_OVERLAY } from '../actions/app'

class ThingsApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _activePage: Object,
      _modules: Array,
      _overlayTemplate: Object
    }
  }

  static get styles() {
    return [
      AppTheme,
      AppStyle,
      css`
        #modal[active] {
          display: flex;
          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.5);
          margin-right: -100%;
          z-index: 10;
        }
        #modal[active] * {
          display: block;
        }
      `
    ]
  }

  render() {
    return html`
      <header-bar></header-bar>

      <nav-bar></nav-bar>

      <main>
        <div id="modal" ?active="${this._overlayTemplate.show}" @click="${this._toggleOverlay}">
          ${this._overlayTemplate.template}
        </div>
        <page-404 class="page" data-page="page404"></page-404>
      </main>

      <aside-bar></aside-bar>

      <footer-bar></footer-bar>
    `
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(location)))

    /* lifecycle - bootstrapping */
    this.dispatchEvent(new Event('lifecycle-bootstrap-begin'))
    this._modules.forEach(m => {
      try {
        m.bootstrap && m.bootstrap()
      } catch (e) {
        console.error(`[BOOTSTRAP-${m.name}]`, e)
      }
    })
    this.dispatchEvent(new Event('lifecycle-bootstrap-finish'))
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      })

      let activePages = this.shadowRoot.querySelectorAll('main > .page[active]')
      activePages.forEach(page => {
        page.removeAttribute('active')
      })

      this._activePage = this.shadowRoot.querySelector(`main > .page[data-page=${this._page}]`)
      this._activePage && this._activePage.setAttribute('active', true)

      store.dispatch({
        type: UPDATE_ACTIVE_PAGE,
        activePage: this._activePage
      })
    }

    if (changedProps.has('_modules')) {
      this._appendFactoryModulePages()
    }
  }

  stateChanged(state) {
    this._page = state.route.page
    this._modules = state.app.modules
    this._overlayTemplate = state.app.overlayTemplate
  }

  _appendFactoryModulePages() {
    var main = this.shadowRoot.querySelector('main')
    ;(this._modules || []).forEach(m => {
      m.routes &&
        m.routes.forEach(route => {
          var el = document.createElement(route.tagname)
          el.setAttribute('class', 'page')
          el.setAttribute('data-page', route.page)

          main.appendChild(el)
        })
    })
  }

  _toggleOverlay() {
    store.dispatch({
      type: TOGGLE_OVERLAY
    })
  }
}

window.customElements.define('things-app', ThingsApp)
