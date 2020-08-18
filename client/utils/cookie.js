import * as cookie from '@things-factory/utils'

/* TOBE-REMOVED 2020년 6월 7일 현재, 사용되지 않고 있음을 확인 */

export function setCookie(cname, cvalue, exdays) {
  console.warn(`setCookie is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  cookie.setCookie(cname, cvalue, exdays)
}

export function getCookie(cname) {
  console.warn(`getCookie is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return cookie.getCookie(cname)
}

export function checkCookie() {
  console.warn(`checkCookie is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  cookie.checkCookie()
}

export function deleteCookie(name) {
  console.warn(`deleteCookie is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  cookie.deleteCookie(name)
}
