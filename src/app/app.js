import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { store } from '../store'

import { navigate, updateOffline, updateLayout, showSnackbar } from '../actions/app'
import { updateAuthenticated, updateUser } from '../actions/auth'

import { AppTheme } from './styles/app-theme'
import { i18next } from '../base/i18next'
import { auth } from '../base/auth'

import { AppStyle } from './app-style'

import './components/snack-bar'
import './components/i18n-msg'

import './layouts/app-toolbar'

class ThingsApp extends connect(store)(LitElement) {
  constructor() {
    super()

    i18next.on('languageChanged', e => {
      store.dispatch(
        showSnackbar(
          i18next.t('text.you.are.now.in', {
            state: {
              text: i18next.t('text.current language')
            }
          })
        )
      )
    })
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
      _message: { type: String },
      _modules: { type: Array },
      _sidebarLeft: Array,
      _sidebarRight: Array,
      _footer: Array
    }
  }

  static get styles() {
    return [AppTheme, AppStyle]
  }

  render() {
    return html`
      <app-toolbar></app-toolbar>

      <!-- Main content -->
      <main role="main">
        <slot id="sidebar-left">
          ${this._sidebarLeft.map(
            sidebar => html`
              <div ?hovering=${sidebar.hovering}>
                ${sidebar.template}
              </div>
            `
          )}
        </slot>

        <div id="main-content">
          <page-404 class="page" data-page="page404"></page-404>
        </div>

        <slot id="sidebar-right">
          ${this._sidebarRight.map(
            sidebar => html`
              <div ?hovering=${sidebar.hovering}>
                ${sidebar.template}
              </div>
            `
          )}
        </slot>
      </main>

      <slot id="footer">
        <snack-bar ?active="${this._snackbarOpened}">${this._message}</snack-bar>
        ${this._footer.map(
          footer => html`
            ${footer.template}
          `
        )}
      </slot>
    `
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(location)))
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)))
    installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))

    auth.on('signin', accessToken => {
      store.dispatch(updateAuthenticated(true))
    })

    auth.on('signout', () => {
      store.dispatch(updateAuthenticated(false))
    })

    auth.on('profile', profile => {
      store.dispatch(updateUser(profile))
    })

    /* lifecycle - bootstrapping */
    this.dispatchEvent(new Event('lifecycle-bootstrap-begin'))
    this._modules.forEach(m => {
      try {
        m.bootstrap && m.bootstrap()
      } catch (e) {
        console.error(e)
      }
    })
    this.dispatchEvent(new Event('lifecycle-bootstrap-finish'))
  }

  updated(changedProps) {
    if (changedProps.has('_showMore')) {
      let morePanel = this.shadowRoot.querySelector('more-panel')
      morePanel.style.display = this._showMore ? 'block' : 'none'
    }

    /* lifecycle - online, offline */
    if (changedProps.has('_offline')) {
      if (this._offline) {
        this.dispatchEvent(new Event('lifecycle-offline'))
      } else {
        this.dispatchEvent(new Event('lifecycle-online'))
      }
    }

    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      })

      let activePages = this.shadowRoot.querySelectorAll('#main-content > .page[active]')
      activePages.forEach(page => {
        page.removeAttribute('active')
      })

      let activePage = this.shadowRoot.querySelector(`#main-content > .page[data-page=${this._page}]`)
      activePage && activePage.setAttribute('active', true)
    }

    if (changedProps.has('_modules')) {
      this.appendFactoryModules()
    }
  }

  stateChanged(state) {
    this._page = state.app.page
    this._offline = state.app.offline
    this._snackbarOpened = state.app.snackbarOpened
    this._message = state.app.message
    this._modules = state.factoryModule.modules
    this._sidebarLeft = state.layout.sidebarLeft
    this._sidebarRight = state.layout.sidebarRight
    this._footer = state.layout.footer
  }

  appendFactoryModules() {
    var main = this.shadowRoot.querySelector('#main-content')
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
}

window.customElements.define('things-app', ThingsApp)
