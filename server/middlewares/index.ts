import { domainMiddleware } from './domain-middleware'
import { config } from '@things-factory/env'

process.on('bootstrap-module-middleware' as any, (app: any) => {
  app.subdomainOffset = config.get('subdomainOffset', 2)

  app.use(domainMiddleware)
})
