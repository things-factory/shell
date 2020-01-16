import * as osUtil from '@things-factory/utils'

export function getOS() {
  console.warn(`getOS is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return osUtil.getOS()
}

export function isMobileDevice() {
  console.warn(`isMobileDevice is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return osUtil.isMobileDevice()
}

export function isIOS() {
  console.warn(`isIOS is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return osUtil.isIOS()
}
