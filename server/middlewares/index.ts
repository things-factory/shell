import { domainMiddleware } from './domain-middleware'

process.on('bootstrap-module-middleware' as any, (app: any) => {
  app.use(domainMiddleware)
})
