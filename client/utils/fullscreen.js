import * as fullscreenLib from '@things-factory/utils'

export function fullscreen(element, afterfull, afterfinish) {
  console.warn(`fullscreen is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  fullscreenLib.fullscreen(element, afterfull, afterfinish)
}

export function exitfullscreen() {
  console.warn(`exitfullscreen is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  fullscreenLib.exitfullscreen()
}

export function togglefullscreen(element, afterfull, afterfinish) {
  console.warn(`togglefullscreen is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  fullscreenLib.togglefullscreen(element, afterfull, afterfinish)
}
