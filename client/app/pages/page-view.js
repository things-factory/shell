import { LitElement, html } from 'lit-element'

import { store } from '../../store'
import { UPDATE_CONTEXT } from '../../actions/route'

import isEqual from 'lodash/isEqual'

function diff(after, before) {
  var changed = false
  var changes = {}

  Object.getOwnPropertyNames(after).forEach(function(key) {
    let before_val = before[key]
    let after_val = after[key]

    if (!isEqual(before_val, after_val)) {
      changes[key] = after_val
      changed = true
    }
  })

  return changed && changes
}

export class PageView extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    var active = String(this.active) == 'true'
    var { active: oldActive = false } = this._oldActivationInfo$ || {}

    /*
     * page lifecycle
     * case 1. page가 새로 activate 되었다.
     * case 2. page가 active 상태에서 location 정보가 바뀌었다.
     **/
    if (active) {
      this.pageUpdate()
    } else if (oldActive) {
      this.pageUpdate({
        active
      })
    }

    return active
  }

  static get properties() {
    return {
      active: Boolean,
      lifecycle: Object
    }
  }

  /* lifecycle */
  pageUpdate(changes = {}, force = false) {
    var before = this._oldActivationInfo$ || {}

    var after = {
      ...before,
      ...this.lifecycle,
      ...changes
    }

    if (!('initialized' in changes) && after.active && !before.initialized) {
      after.initialized = true
    }

    if (force) {
      after.updated = Date.now()
    }

    var changed = diff(after, before)
    if (!changed) {
      return
    }

    this._oldActivationInfo$ = after

    /* page가 main 영역에서 active되거나 deactive되는 시점에 호출된다. */
    /* mobile mode 이거나, closed 상태인 경우에 pageInit를 수행한다. */
    if (changed.initialized) {
      /* pageActivated된 경우에만 opened 상태가 될 수 있다. */
      this.pageInitialized(after)
    }

    if ('active' in changed) {
      /* for compatibility only */
      this.activated(changed.active)
      this.pageActivated(changed.active)
    }

    this.pageUpdated(changed, after, before)
    /* active page인 경우에는, page Context 갱신도 필요할 것이다. */
    after.active && this.updateContext()

    if ('initialized' in changed && !changed.initialized) {
      this.pageDisposed(after)
    }
  }

  pageReset() {
    var { initialized } = this._oldActivationInfo$ || {}

    if (initialized) {
      this.pageDispose()
      this.pageUpdate({}, true)
    }
  }

  pageDispose() {
    this.pageUpdate({
      initialized: false
    })
  }

  // TODO. remove activated(), pageActivated() callback. This only for compatibility now.
  activated(active) {}
  pageActivated(active) {}

  pageInitialized(pageInfo) {}
  pageUpdated(changes, after, before) {}
  pageDisposed(pageInfo) {}

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
