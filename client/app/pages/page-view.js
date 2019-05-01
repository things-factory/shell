import { LitElement, html } from 'lit-element'

import { store } from '../../store'
import { UPDATE_CONTEXT } from '../../actions/route'

export class PageView extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    if (!this.active) {
      return false
    }

    if (this._oldactive$ !== this.active) {
      this.updateContext()
    }

    this._oldactive$ = this.active

    return true
  }

  static get properties() {
    return {
      active: Boolean
    }
  }

  updateContext() {
    store.dispatch({
      type: UPDATE_CONTEXT,
      context: this.context
    })
  }

  get context() {
    return {}
  }
}
