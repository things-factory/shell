/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'

import { localize } from '../mixins/localize-mixin'
import { i18next } from '../i18next'

export default class I18nMsg extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      msgid: String
    }
  }

  render() {
    return html`
      ${i18next.t(this.msgid)}
    `
  }
}

customElements.define('i18n-msg', I18nMsg)
