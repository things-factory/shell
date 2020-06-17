import { getPathInfo } from '@things-factory/utils'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import { Domain } from '../entities'

export async function domainMiddleware(context: any, next: any): Promise<void> {
  try {
    var { request } = context
    var { header } = request
    var { referer } = header
    var domain
    var pathInfo
    if (referer) {
      var { pathname } = new URL(referer)
      pathInfo = getPathInfo(pathname)
    }

    domain = request.get('x-things-factory-domain') || pathInfo?.domain

    var domainObj = {}

    if (domain) {
      var repo = getRepository(Domain)
      var d = await repo.findOne({
        where: [{ subdomain: domain }],
        cache: true
      })

      if (d) {
        domainObj = d
      }
    }

    context.state.domain = domainObj

    return next()
  } catch (e) {
    return next()
  }
}
