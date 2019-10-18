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

export function swipe(opts) {
  opts = Object.assign(
    {
      // https://bugs.chromium.org/p/chromium/issues/detail?id=766938
      startThreshold: 50,
      abortThreshold: 150,
      onStateChange(state, opts) {
        /* noop */
      }
    },
    opts
  )

  var { container, startThreshold, abortThreshold, onStateChange, animates } = opts

  let distance, offset, state // state: dragging, aborting, reached, swiping

  return ontouchpan({
    element: container,

    onpanmove(e) {
      let d = e.deltaX

      if (state in { aborting: 1, swiping: 1 }) return

      if (distance == null) {
        if (Math.abs(d) < startThreshold) {
          return
        }

        if (e.cancelable) {
          e.preventDefault()
        }

        offset = d
        state = 'dragging'
        onStateChange(state, opts)
      }

      d = d - offset
      distance = Math.abs(d)

      if ((distance >= abortThreshold && state !== 'reached') || (distance < abortThreshold && state !== 'dragging')) {
        state = state === 'reached' ? 'dragging' : 'reached'
        onStateChange(state, opts)
      }

      animates.dragging(d, opts)
    },

    async onpanend(e) {
      if (state == null) return

      if (state === 'dragging') {
        state = 'aborting'
        onStateChange(state)

        animates.aborting(opts)
      } else if (state === 'reached') {
        state = 'swiping'
        onStateChange(state, opts)

        await animates.swiping(e.deltaX, opts)
      }

      distance = state = offset = null
    }
  })
}
