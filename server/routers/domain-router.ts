import Router from 'koa-router'
import { domainMiddleware } from '../middlewares/domain-middleware'

const send = require('koa-send')

export const domainRouter = new Router()
domainRouter.use(domainMiddleware)

domainRouter.get('/file/:file', async (context, next) => {
  await send(context, context.params.file, { root: process.env.UPLOAD_DIR })
})
