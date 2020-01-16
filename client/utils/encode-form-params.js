import * as encodeForm from '@things-factory/utils/src/encode-form-params'

export function encodeFormParams(obj) {
  console.warn(`encodeFormParams is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return encodeForm.encodeFormParams(obj)
}
