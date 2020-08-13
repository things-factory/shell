import { getPathInfo } from '@things-factory/utils'
import 'reflect-metadata'
import { URL } from 'url'

export async function domainMiddleware(context: any, next: any): Promise<void> {
  try {
    let { request } = context
    let { header } = request
    let { referer } = header
    let domain
    let pathInfo
    if (referer) {
      let { pathname } = new URL(referer)
      pathInfo = getPathInfo(pathname)
    }

    domain = request.get('x-things-factory-domain') || pathInfo?.domain
    context.state.domain = domain

    return next()
  } catch (e) {
    return next()
  }
}
