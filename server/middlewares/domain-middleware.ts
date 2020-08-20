import { getPathInfo } from '@things-factory/utils'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import { Domain } from '../entities'

export async function domainMiddleware(context: any, next: any) {
  var { request } = context
  var { header } = request
  var { referer } = header

  var pathInfo
  if (referer) {
    var { pathname } = new URL(referer)
    pathInfo = getPathInfo(pathname)
  }

  const subdomain = request.get('x-things-factory-domain') || pathInfo?.domain || context.subdomains.slice(-1)[0]

  if (subdomain) {
    context.state.domain = await getRepository(Domain).findOne(
      { subdomain },
      {
        cache: true
      }
    )
  }

  await next()
}
