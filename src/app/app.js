import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { store } from '../store'

import { navigate, updateOffline } from '../actions/app'
import { updateAuthenticated, updateUser } from '../actions/auth'

import { AppTheme } from './styles/app-theme'
import { auth } from '../base/auth'

import { AppStyle } from './app-style'

class ThingsApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _activePage: Object,
      _offline: Boolean,
      _modules: Array
    }
  }

  static get styles() {
    return [AppTheme, AppStyle]
  }

  render() {
    return html`
      <header-bar></header-bar>

      <nav-bar></nav-bar>

      <main>
        <page-404 class="page" data-page="page404"></page-404>
      </main>

      <aside-bar></aside-bar>

      <footer-bar></footer-bar>
    `
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(location)))
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)))

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

      let activePages = this.shadowRoot.querySelectorAll('main > .page[active]')
      activePages.forEach(page => {
        page.removeAttribute('active')
      })

      this._activePage = this.shadowRoot.querySelector(`main > .page[data-page=${this._page}]`)
      this._activePage && this._activePage.setAttribute('active', true)
    }

    if (changedProps.has('_modules')) {
      this._appendFactoryModulePages()
    }
  }

  stateChanged(state) {
    this._page = state.app.page
    this._offline = state.app.offline
    this._modules = state.factoryModule.modules
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
}

window.customElements.define('things-app', ThingsApp)
