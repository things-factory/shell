import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../store'

class AppToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      _appTools: Array,
      _page: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        [app-toolbar] {
          display: flex;
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
          padding: 0 10px 0 10px;
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

        span.space {
          width: 10px;
        }

        [user],
        [setting] {
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
    var contextTools = this._page.contextTools
    var frontMostTools = []
    var frontTools = []
    var backTools = []
    var backMostTools = []

    return html`
      <div app-toolbar>
        <mwc-icon setting>settings</mwc-icon>
        <slot id="frontMost">
          ${frontMostTools}
        </slot>

        <slot id="front">
          ${frontTools}
        </slot>

        <span class="padding"></span>

        <slot id="back">
          ${backTools}
        </slot>

        <slot id="backMost">
          ${backMostTools}
        </slot>

        <div id="user-box">
          <a href="/profile">
            <mwc-icon title="user" user>person</mwc-icon>
          </a>

          <!-- <div id="more" @click=${this.showMorePanel}>...</div> -->
        </div>
      </div>
    `
  }

  // firstUpdated() {
  //   this.addMorenda()
  // }

  // addMorenda() {
  //   store.dispatch({
  //     type: ADD_MORENDA,
  //     morenda: {
  //       icon: 'aaa.png',
  //       name: 'set language',
  //       morelet: this.morelet()
  //     }
  //   })
  // }

  // morelet() {
  //   return html`
  //     <select
  //       @change="${e => {
  //         i18next.changeLanguage(e.target.value)
  //       }}"
  //     >
  //       <option value="en-US" ?selected=${i18next.language == 'en-US'}>English</option>
  //       <option value="ko-KR" ?selected=${i18next.language == 'ko-KR'}>한국어</option>
  //     </select>
  //   `
  // }

  // showMorePanel() {
  //   store.dispatch({
  //     type: TOGGLE_MORE_PANEL
  //   })
  // }

  // _onChangeLocale(e) {
  //   var locale = e.target.getAttribute('locale')

  //   i18next.changeLanguage(locale)

  //   store.dispatch({
  //     type: 'SET-LOCALE',
  //     locale
  //   })
  // }

  stateChanged(state) {
    this._appTools = state.layout.appTools
    this._page = state.app.page
  }

  _onDrawerOpen(e) {
    store.dispatch(updateDrawerState(true))
  }
}

customElements.define('app-toolbar', AppToolbar)
