import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../store'
import { i18next } from '../i18next'

class PageToolbar extends connect(store)(LitElement) {
  static get is() {
    return 'page-toolbar'
  }

  constructor() {
    super()

    this.email = ''
    this.drawerOpened = false
  }

  static get properties() {
    return {
      // statePath: 'auth.locale'
      locale: Object,
      // statePath: 'app.drawerOpened'
      drawerOpened: Boolean,
      // statePath: 'app.auth.user.email
      email: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        [app-toolbar] {
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        paper-menu-button {
          padding-left: 0px;
        }

        mwc-button {
          font-size: 14px;
          margin: 0px;
          padding: 0px;
          vertical-align: middle;
        }

        .padding {
          flex: 1;
        }

        slot {
          display: flex;
          flex: 1;
          flex-basis: 1280px;
          flex-wrap: nowrap;
          height: 100%;
          align-items: center;
          overflow: hidden;
          padding: 10px;
        }

        ::slotted(*) {
          flex: 1;
          padding: 0px;
        }

        ::slotted(paper-input) {
          --paper-input-container-input-color: white;
        }

        ::slotted(paper-icon-button) {
          flex-basis: 32px;
          min-width: 20px;
        }

        ::slotted(.vline) {
          display: block;
          flex: none;
          border-left: 1px solid rgba(255, 255, 255, 0.07);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          width: 0px;
          height: 18px;
          margin: 0 4px;
        }

        ::slotted(label) {
          margin-right: 5px;
          color: #fff;
          font-size: 20px;
        }

        [logo] {
          width: 45px;
          height: 45px;
        }

        span.space {
          width: 10px;
        }

        [user] {
          border-radius: 50%;
          background-color: var(--secondary-color);
          padding: 2px;
          margin: 2px;

          font-size: 1em;
        }

        #user-box {
          flex-basis: 270px;
          justify-content: flex-end;
          align-items: center;
          display: flex;
        }
      `
    ]
  }

  render() {
    return html`
      <div app-toolbar>

        <img
          src="/assets/images/logo.png"
          class="menu-btn"
          title="Menu"
          @click=${e => this._onDrawerOpen(e)}
          ?hidden=${this.drawerOpened}
          logo>
        </img>

        <slot></slot>
        
        <span class="padding"></span>

        <div id="user-box">
          <a href="/profile">
            <mwc-icon title="acting" user>person</mwc-icon>
          </a>

          <mwc-button .label=${this.email}
            slot="dropdown-trigger"></mwc-button>

          <select
            @change="${e => {
              i18next.changeLanguage(e.target.value)
            }}"
          >
            <option value="en-US" ?selected="${i18next.language == 'en-US'}">English</option>
            <option value="ko-KR" ?selected="${i18next.language == 'ko-KR'}">한국어</option>
          </select>

        </div>

      </div>
    `
  }

  stateChanged(state) {
    this.locale = state.auth.locale
    this.drawerOpened = state.app.drawerOpened
    this.email = state.auth.user && state.auth.user.email
  }

  _onDrawerOpen(e) {
    store.dispatch(updateDrawerState(true))
  }

  _onChangeLocale(e) {
    var locale = e.target.getAttribute('locale')

    i18next.changeLanguage(locale)

    store.dispatch({
      type: 'SET-LOCALE',
      locale
    })
  }
}

customElements.define(PageToolbar.is, PageToolbar)
