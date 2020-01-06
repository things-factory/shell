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
  shouldUpdate(changes) {
    var active = String(this.active) == 'true'
    var { active: oldActive = false } = this._oldLifecycleInfo$ || {}

    /*
     * page lifecycle
     * case 1. page가 새로 activate 되었다.
     * case 2. page가 active 상태에서 lifecycle 정보가 바뀌었다.
     **/
    if (active) {
      this.pageUpdate({
        active
      })
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
      lifecycle: Object,
      contextPath: { attribute: 'context-path' }
    }
  }

  /* lifecycle */
  async pageUpdate(changes = {}, force = false) {
    var before = this._oldLifecycleInfo$ || {}

    var after = {
      ...before,
      ...this.lifecycle,
      contextPath: this.contextPath,
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

    this._oldLifecycleInfo$ = after

    /* page의 이미 초기화된 상태에서 contextPath가 바뀐다면, 무조건 page가 리셋되어야 한다. */
    if (before.initialized && changed.contextPath) {
      await this.pageReset()
      return
    }

    if (changed.initialized) {
      await this.pageInitialized(after)
    }

    if ('initialized' in changed) {
      if (changed.initialized) {
        /*
         * 방금 초기화된 경우라면, 엘리먼트들이 만들어지지 않았을 가능성이 있으므로,
         * 다음 animationFrame에서 pageUpdated 콜백을 호출한다.
         */
        requestAnimationFrame(async () => {
          await this.pageUpdated(changed, after, before)
          /* active page인 경우에는, page Context 갱신도 필요할 것이다. */
          after.active && this.updateContext()
        })
      } else {
        await this.pageDisposed(after)
      }
    } else {
      await this.pageUpdated(changed, after, before)
      /* active page인 경우에는, page Context 갱신도 필요할 것이다. */
      after.active && this.updateContext()
    }
  }

  async pageReset() {
    var { initialized } = this._oldLifecycleInfo$ || {}

    if (initialized) {
      await this.pageDispose()
      await this.pageUpdate({}, true)
    }
  }

  async pageDispose() {
    await this.pageUpdate({
      initialized: false
    })
  }

  pageInitialized(pageInfo) {}
  pageUpdated(changes, after, before) {}
  pageDisposed(pageInfo) {}

  /* context */
  updateContext(override) {
    store.dispatch({
      type: UPDATE_CONTEXT,
      context: override ? { ...this.context, ...override } : this.context
    })
  }

  get context() {
    return {}
  }
}
