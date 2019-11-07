import { CONTEXT_PATH_PREFIX } from '../context-path-prefix'

export function getContextPathFromLocation() {
  var regexp = new RegExp(`${CONTEXT_PATH_PREFIX}/(\\w+)`)
  var matched = location.pathname.match(regexp)
  return matched ? matched[1] : ''
}

export function makeContextPath(context) {
  return `${CONTEXT_PATH_PREFIX}/${context}`
}
