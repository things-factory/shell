import * as flatten from '@things-factory/utils/src/flatten-object'

export function flattenObject(obj, delimiter = '|') {
  console.warn(`flattenObject is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return flatten.flattenObject(obj, delimiter)
}
