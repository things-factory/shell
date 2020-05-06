import { getPathInfo } from '@things-factory/utils'
import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { URL } from 'url'
import { Domain } from '../entities'

export async function domainMiddleware(context: any, next: any): Promise<void> {
  try {
    var { request } = context
    var { header } = request
    var { referer } = header
    var { pathname } = new URL(referer)
    var { domain } = getPathInfo(pathname)

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
