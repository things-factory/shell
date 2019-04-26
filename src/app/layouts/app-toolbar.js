import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../store'
import { TOOL_POSITION } from '../../actions/layout'

class AppToolbar extends connect(store)(LitElement) {
  static get properties() {
    return {
      activePage: Object,
      _appTools: Array,
      _pageTools: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        .padding {
          flex: 1;
        }

        slot {
          display: flex;
          flex-wrap: nowrap;
          height: 100%;
          align-items: center;
          overflow: hidden;
          padding: 0 10px 0 10px;
        }

        ::slotted(*) {
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

        ::slotted(#rightEnd *) {
          justify-content: right;
        }

        span.space {
          width: 10px;
        }
      `
    ]
  }

  render() {
    var leftEndTools = this._appTools.filter(tool => tool.position == TOOL_POSITION.LEFT_END)
    var leftTools = this._appTools.filter(tool => tool.position == TOOL_POSITION.LEFT)
    var rightTools = this._appTools.filter(tool => tool.position == TOOL_POSITION.RIGHT)
    var rightEndTools = this._appTools.filter(tool => tool.position == TOOL_POSITION.RIGHT_END)

    return html`
      <slot id="leftEnd">
        ${leftEndTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </slot>

      <slot id="left">
        ${leftTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
        ${this._pageTools || html``}
      </slot>

      <span class="padding"></span>

      <slot id="right">
        ${rightTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </slot>

      <slot id="rightEnd">
        ${rightEndTools.map(
          tool =>
            html`
              ${tool.template}
            `
        )}
      </slot>
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
  }

  updated(changedProps) {
    if (changedProps.has('activePage')) {
      // TODO active page가 바뀐 이후에도 아직 import(lazy loading)되지 않은 상황에서는
      // activePage.tools 결과가 undefined 이다.
      // 일단은, 100ms마다 계속 시도하는 것으로 하였으나, 더 좋은 방법이 있다면 개선한다.

      clearTimeout(this._timeout)

      var _ = () => {
        this._pageTools = this.activePage && this.activePage.tools
        if (!this._pageTools) {
          this._timeout = setTimeout(_, 100)
        }
      }

      _()
    }
  }

  _onDrawerOpen(e) {
    store.dispatch(updateDrawerState(true))
  }
}

customElements.define('app-toolbar', AppToolbar)
