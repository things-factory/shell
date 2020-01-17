export function fullscreen(element, afterfull, afterfinish) {
  var org_width = element.style.width
  var org_height = element.style.height

  function _fullscreen_callback(e) {
    if (
      !document.fullscreen &&
      !document.mozFullScreen &&
      !document.webkitIsFullScreen &&
      !document.msFullscreenElement
    ) {
      ;['fullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'].forEach(event =>
        document.removeEventListener(event, _fullscreen_callback)
      )

      element.style.width = org_width
      element.style.height = org_height

      afterfinish && afterfinish()
    } else {
      element.style.width = '100%'
      element.style.height = '100%'

      afterfull && afterfull()
    }
  }

  ;['fullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'].forEach(event =>
    document.addEventListener(event, _fullscreen_callback)
  )

  if (element.requestFullScreen) element.requestFullScreen()
  else if (element.webkitRequestFullScreen) element.webkitRequestFullScreen()
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
  else if (element.msRequestFullscreen) element.msRequestFullscreen()
}

export function exitfullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

export function togglefullscreen(element, afterfull, afterfinish) {
  if (!document.fullscreen && !document.mozFullScreen && !document.webkitIsFullScreen && !document.msFullscreenElement)
    fullscreen(element, afterfull, afterfinish)
  else exitfullscreen()
}
