import { CONTEXT_PATH_PREFIX } from '../context-path-prefix'

export function getPathInfo(pathname) {
  var regexp = new RegExp(`(/${CONTEXT_PATH_PREFIX}/(\\w+))?(/.*)`)
  var matched = pathname.match(regexp)
  var contextPath = matched[1] || ''
  var domain = matched[2] || ''
  var path = matched[3]

  return {
    contextPath,
    domain,
    path
  }
}

export function makeContextPath(context) {
  return `${CONTEXT_PATH_PREFIX}/${context}`
}
