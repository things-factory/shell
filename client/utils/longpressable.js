/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

/* Inspired by https://github.com/john-doherty/long-press-event */

var timer = null

// check if we're using a touch screen
var isTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

// switch to touch events if using a touch screen
var mouseDown = isTouch ? 'touchstart' : 'mousedown'
var mouseOut = isTouch ? 'touchcancel' : 'mouseout'
var mouseUp = isTouch ? 'touchend' : 'mouseup'
var mouseMove = isTouch ? 'touchmove' : 'mousemove'

/**
 * Fires the 'long-press' event on element
 * @returns {void}
 */
function fireLongPressEvent() {
  clearLongPressTimer()

  // fire the long-press event
  var suppressClickEvent = this.dispatchEvent(new CustomEvent('long-press', { bubbles: true, cancelable: true }))

  if (suppressClickEvent) {
    // temporarily intercept and clear the next click
    this.addEventListener(
      mouseUp,
      function clearMouseUp(e) {
        this.removeEventListener(mouseUp, clearMouseUp, true)
        cancelEvent(e)
      },
      true
    )
  }
}

/**
 * method responsible for starting the long press timer
 * @param {event} e - event object
 * @returns {void}
 */
function startLongPressTimer(e) {
  clearLongPressTimer(e)

  var el = e.target

  // get delay from html attribute if it exists, otherwise default to 1500
  var longPressDelayInMs = parseInt(el.getAttribute('data-long-press-delay') || '600', 10)

  // start the timer
  timer = setTimeout(fireLongPressEvent.bind(el), longPressDelayInMs)
}

/**
 * method responsible for clearing a pending long press timer
 * @param {event} e - event object
 * @returns {void}
 */
function clearLongPressTimer(e) {
  clearTimeout(timer)
  timer = null
}

/**
 * Cancels the current event
 * @param {object} e - browser event object
 * @returns {void}
 */
function cancelEvent(e) {
  e.stopImmediatePropagation()
  e.preventDefault()
  e.stopPropagation()
}

export const longpressable = element => {
  // hook events that clear a pending long press event
  element.addEventListener(mouseOut, clearLongPressTimer, true)
  element.addEventListener(mouseUp, clearLongPressTimer, true)
  element.addEventListener(mouseMove, clearLongPressTimer, true)
  element.addEventListener('wheel', clearLongPressTimer, true)
  element.addEventListener('scroll', clearLongPressTimer, true)

  // hook events that can trigger a long press event
  element.addEventListener(mouseDown, startLongPressTimer, true) // <- start

  // cancel context for touch display
  if (mouseDown.indexOf('touch') === 0) {
    element.addEventListener('contextmenu', cancelEvent, true)
  } else {
    element.addEventListener('contextmenu', clearLongPressTimer, true)
  }
}
