/**
 * inspired by https://github.com/jiangfengming/pull-to-refresh
 */

import './pull-to-refresh-control'

function ontouchpan({ element, onpanstart, onpanmove, onpanend }) {
  let touchId, startX, startY, panstartCalled

  function calcMovement(e) {
    const touch = Array.prototype.slice.call(e.changedTouches).filter(touch => touch.identifier === touchId)[0]
    if (!touch) return false

    e.deltaX = touch.screenX - startX
    e.deltaY = touch.screenY - startY
    return true
  }

  function touchstart(e) {
    const touch = e.changedTouches[0]
    touchId = touch.identifier
    startX = touch.screenX
    startY = touch.screenY
  }

  function touchmove(e) {
    if (calcMovement(e)) {
      if (onpanstart && !panstartCalled) {
        onpanstart(e)
        panstartCalled = true
      }

      onpanmove(e)
    }
  }

  function touchend(e) {
    if (calcMovement(e)) onpanend(e)
  }

  element.addEventListener('touchstart', touchstart)
  if (onpanmove) element.addEventListener('touchmove', touchmove)
  if (onpanend) element.addEventListener('touchend', touchend)

  return function() {
    element.removeEventListener('touchstart', touchstart)
    if (onpanmove) element.removeEventListener('touchmove', touchmove)
    if (onpanend) element.removeEventListener('touchend', touchend)
  }
}

export function pulltorefresh(opts) {
  opts = Object.assign(
    {
      // https://bugs.chromium.org/p/chromium/issues/detail?id=766938
      scrollable: document.body,
      threshold: 150,
      onStateChange(state, opts) {
        /* noop */
      }
    },
    opts
  )

  var { container, scrollable, threshold, refresh, onStateChange, animates } = opts

  if (!animates) {
    animates = document.createElement('pulltorefresh-control')
    container.appendChild(animates)
  }

  let distance, offset, state // state: pulling, aborting, reached, refreshing, restoring

  function addClass(cls) {
    animates.classList.add('pull-to-refresh--' + cls)
  }

  function removeClass(cls) {
    animates.classList.remove('pull-to-refresh--' + cls)
  }

  function scrollTop() {
    if (!scrollable || [window, document, document.body, document.documentElement].includes(scrollable)) {
      return document.documentElement.scrollTop || document.body.scrollTop
    } else {
      return scrollable.scrollTop
    }
  }

  return ontouchpan({
    element: container,

    onpanmove(e) {
      let d = e.deltaY

      if (scrollTop() > 0 || (d < 0 && !state) || state in { aborting: 1, refreshing: 1, restoring: 1 }) return

      if (e.cancelable) {
        e.preventDefault()
      }

      if (distance == null) {
        offset = d
        state = 'pulling'
        addClass(state)
        onStateChange(state, opts)
      }

      d = d - offset
      if (d < 0) d = 0
      distance = d

      if ((d >= threshold && state !== 'reached') || (d < threshold && state !== 'pulling')) {
        removeClass(state)
        state = state === 'reached' ? 'pulling' : 'reached'
        addClass(state)
        onStateChange(state, opts)
      }

      animates.pulling(d, opts)
    },

    onpanend() {
      if (state == null) return

      if (state === 'pulling') {
        removeClass(state)
        state = 'aborting'
        onStateChange(state)
        addClass(state)
        animates.aborting(opts).then(() => {
          removeClass(state)
          distance = state = offset = null
          onStateChange(state)
        })
      } else if (state === 'reached') {
        removeClass(state)
        state = 'refreshing'
        addClass(state)
        onStateChange(state, opts)
        animates.refreshing(opts)

        refresh().then(() => {
          removeClass(state)
          state = 'restoring'
          addClass(state)
          onStateChange(state)

          animates.restoring(opts).then(() => {
            removeClass(state)
            distance = state = offset = null
            onStateChange(state)
          })
        })
      }
    }
  })
}
