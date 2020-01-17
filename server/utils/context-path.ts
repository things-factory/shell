import * as Utils from '@things-factory/utils'

export function getPathInfo(pathname) {
  console.warn(`getPathInfo is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return Utils.getPathInfo(pathname)
}

export function makeContextPath(context) {
  console.warn(`makeContextPath is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return Utils.makeContextPath(context)
}
