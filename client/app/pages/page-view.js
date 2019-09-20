import { LitElement, html } from 'lit-element'

import { store } from '../../store'
import { isMobileDevice } from '../../utils/os'
import { UPDATE_CONTEXT } from '../../actions/route'

export class PageView extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    var active = String(this.active) == 'true'

    if (active !== this._oldactive$) {
      // Page activation 상태가 바뀌면 호출된다.
      this._oldactive$ = active

      this.pageActivated(active)
      active && this.updateContext()
    }

    return active
  }

  static get properties() {
    return {
      active: Boolean,
      _pageInitialized: Boolean
    }
  }

  /* lifecycle */
  pageInit() {
    this._pageInitialized && this.pageInitialized()
  }

  pageDispose() {
    if (this._pageInitialized) {
      this._pageInitialized = false
      this.pageDisposed()
    }
  }

  pageActivated(active) {
    /* page가 main 영역에서 active되거나 deactive되는 시점에 호출된다. */
    /* mobile mode 이거나, closed 상태인 경우에 pageInit를 수행한다. */
    if (active && !this._pageInitialized) {
      /* pageActivated된 경우에만 opened 상태가 될 수 있다. */
      this._pageInitialized = true
      this.pageInitialized()
    }

    if (!active && isMobileDevice()) {
      /* mobile 상태인 경우 deactivate는 disposed를 의미한다. */
      this.pageDispose()
    }

    this.activated(active)
  }

  activated(active) {} // TODO. remove activated() callback. This only for compatibility now.
  pageInitialized() {}
  pageDisposed() {}

  /* context */
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
