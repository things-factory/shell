import * as deep from '@things-factory/utils/src/deep-clone'

export function deepClone(value) {
  console.warn(`deepClone is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return deep.deepClone(value)
}

export function deepEquals(value, others) {
  console.warn(`deepEquals is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return deep.deepEquals(value, others)
}
