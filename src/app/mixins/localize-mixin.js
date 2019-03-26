/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

let _i18nextInitialized = false

export const localize = i18next => baseElement =>
  class extends baseElement {
    shouldUpdate() {
      if (super.shouldUpdate && !super.shouldUpdate()) {
        return false
      }
      return _i18nextInitialized
    }

    connectedCallback() {
      if (!_i18nextInitialized) {
        i18next.on('initialized', options => {
          _i18nextInitialized = true
          this.requestUpdate()
        })
      }

      i18next.on('languageChanged', () => {
        this.requestUpdate()
      })

      if (super.connectedCallback) {
        super.connectedCallback()
      }
    }
  }
