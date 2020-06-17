import * as swipeUtil from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

export function swipe(opts) {
  console.warn(`swipe is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return swipeUtil.swipe(opts)
}
