import { LitElement, html } from 'lit-element'

import { store } from '../../store'
import { UPDATE_CONTEXT } from '../../actions/route'

export class PageView extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    if (this.active !== this._oldactive$) {
      // Page activation 상태가 바뀌면 호출된다.
      this.onPageActive(this.active)
    }

    if (!this.active) {
      this._oldactive$ = false
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

  onPageActive(state) {}

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
