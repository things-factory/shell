import { CONTEXT_PATH_PREFIX } from '../context-path-prefix'

export function getDomainFromPathname(pathname) {
  return getPathInfo(pathname).domain
}

export function getPathInfo(pathname) {
  var regexp = new RegExp(`(/${CONTEXT_PATH_PREFIX}/(\\w+))?(/.*)`)
  var matched = pathname.match(regexp)
  var domain = matched[2] || ''
  var path = matched[3]

  return {
    domain,
    path
  }
}

export function makeContextPath(context) {
  return `${CONTEXT_PATH_PREFIX}/${context}`
}
