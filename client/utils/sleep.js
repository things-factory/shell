import * as sleepUtil from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

export function sleep(ms) {
  console.warn(`sleep is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return sleepUtil.sleep(ms)
}
