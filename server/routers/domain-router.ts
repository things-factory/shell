import Router from 'koa-router'
import { domainMiddleware } from '../middlewares/domain-middleware'

const send = require('koa-send')

export const domainPublicRouter = new Router()
domainPublicRouter.use(domainMiddleware)

export const domainPrivateRouter = new Router()
domainPrivateRouter.use(domainMiddleware)
