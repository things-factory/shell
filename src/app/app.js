/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import { BoardAuthProvider } from '@things-shell/client-auth'

// This element is connected to the Redux store.
import { store } from '../store.js'

// These are the actions needed by this element.
import { navigate, updateOffline, updateLayout } from '../actions/app.js'
import { updateUser, updateAuthenticated } from '../actions/auth.js'

// These are the elements needed by this element.
import './components/snack-bar'

class ThingsApp extends connect(store)(LitElement) {
  constructor() {
    super()

    this.baseUrl = 'http://board-demo.hatiolab.com/rest'
    this.authProvider = BoardAuthProvider
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          padding: 24px;
          max-width: 600px;
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
          display: block;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          border-top: 1px solid #ccc;
          text-align: center;
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
    // Anything that's related to rendering should be done in here.
    return html`
      <auth-router
        .authProvider=${this.authProvider}
        @authenticated-changed=${this.onAuthenticatedChanged}
        @profile-changed=${this.onProfileChanged}
        @error-changed=${this.onAuthErrorChanged}
        .endpoint=${this.baseUrl}
        signin-path="login"
        signout-path="logout"
        profile-path="session_info"
        signin-page="signin"
        signup-page="signup"
      ></auth-router>

      <header>
        <h1>${this.appTitle}</h1>
        <nav class="toolbar-list">
          <a ?selected="${this._page === 'page1'}" href="/page1">Page One</a>|
          <a ?selected="${this._page === 'page2'}" href="/page2">Page Two</a>|
        </nav>
      </header>

      <!-- Main content -->
      <main role="main" class="main-content">
        <my-page1 class="page" ?active="${this._page === 'page1'}"></my-page1>
        <my-page2 class="page" ?active="${this._page === 'page2'}"></my-page2>
        <my-page404 class="page" ?active="${this._page === 'page404'}"></my-page404>

        <auth-signin class="page" ?active=${this._page === 'signin'}></auth-signin>
        <auth-signup class="page" ?active=${this._page === 'signup'}></auth-signup>
        <auth-profile class="page" ?active=${this._page === 'profile'}></auth-profile>
      </main>

      <footer>
        <p>Made with &hearts; by the Polymer team.</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))))
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)))
    installMediaQueryWatcher(`(min-width: 460px)`, matches => store.dispatch(updateLayout(matches)))
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      })
    }
  }

  stateChanged(state) {
    this._page = state.app.page
    this._offline = state.app.offline
    this._snackbarOpened = state.app.snackbarOpened
  }

  onProfileChanged(e) {
    store.dispatch(updateUser(e.detail.profile))
  }

  onAuthenticatedChanged(e) {
    var auth = e.detail
    store.dispatch(updateAuthenticated(auth))
    // store.dispatch(
    //   showSnackbar(
    //     i18next.t('text.you.are.now.in', {
    //       state: i18next.t(auth.authenticated ? 'text.signed in' : 'text.signed out')
    //     })
    //   )
    // )
  }

  onAuthErrorChanged() {
    if (this.authError) {
      store.dispatch(showSnackbar(this.authError))
    }
  }
}

window.customElements.define('things-app', ThingsApp)
