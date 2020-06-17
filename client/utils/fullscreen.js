import * as fullscreenLib from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

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
