import * as flatten from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

export function flattenObject(obj, delimiter = '|') {
  console.warn(`flattenObject is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return flatten.flattenObject(obj, delimiter)
}
