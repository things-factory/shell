import unless from 'koa-unless'
import { config } from '@things-factory/env'
import { domainMiddleware } from './domain-middleware'
;(domainMiddleware as any).unless = unless

const DOMAIN_CHECK_URLS = ['graphql', 'graphiql']

process.on('bootstrap-module-middleware' as any, (app: any) => {
  app.subdomainOffset = config.get('subdomainOffset', 2)

  let unlessOption = {
    path: [new RegExp(`^(?!\/?(${DOMAIN_CHECK_URLS.join('|')})(?![^/]))`)]
  }
  ;(app as any).use((domainMiddleware as any).unless(unlessOption))
})
