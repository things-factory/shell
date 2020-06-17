import * as deep from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

export function deepClone(value) {
  console.warn(`deepClone is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return deep.deepClone(value)
}

export function deepEquals(value, others) {
  console.warn(`deepEquals is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return deep.deepEquals(value, others)
}
