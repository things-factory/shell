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

import './components/snack-bar'
import './components/i18n-msg'

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
      _modules: { type: Array }
    }
  }

  static get styles() {
    return [
      AppTheme,
      css`
        :host {
          display: flex;
          flex-direction: row;
        }

        header {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .toolbar-list > a {
          display: inline-block;
          color: black;
          text-decoration: none;
          padding: 0 8px;
        }

        .toolbar-list > a[selected] {
          font-weight: bold;
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          flex: 1;

          display: flex;
          flex-direction: column;

          width: 100vw;
          height: 100vh;
        }

        main > * {
          display: none;
        }

        main > *[active] {
          flex: 1;

          display: flex;
          flex-direction: column;
        }

        /* Wide layout */
        @media (min-width: 460px) {
          header {
            flex-direction: row;
          }
        }
      `
    ]
  }

  render() {
    return html`
      <!-- Main content -->
      <main role="main" class="main-content">
        <page-404 class="page" data-page="page404"></page-404>
      </main>

      <snack-bar ?active="${this._snackbarOpened}">${this._message}</snack-bar>
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

      var activePages = this.shadowRoot.querySelectorAll('main > .page[active]')
      activePages.forEach(page => {
        page.removeAttribute('active')
      })

      var activePage = this.shadowRoot.querySelector(`main > .page[data-page=${this._page}]`)
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
  }

  appendFactoryModules() {
    var main = this.shadowRoot.querySelector('main')
    ;(this._modules || []).forEach(m => {
      m.routes &&
        m.routes.forEach(route => {
          var el = document.createElement(route.tagname)
          el.setAttribute('class', 'page')
          el.setAttribute('data-page', route.pageName)

          main.appendChild(el)
        })
    })
  }
}

window.customElements.define('things-app', ThingsApp)
