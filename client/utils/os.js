import * as osUtil from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, isMobileDevice는 여러 모듈에서 사용되고 있음 - 그 외에는 사용되고 있지 않음. */

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
