import Router from 'koa-router'
const send = require('koa-send')
import { koa as voyagerMiddleware } from 'graphql-voyager/middleware'

export const routes = new Router()

// for providing resource
routes.get('/file/:file', async (context, next) => {
  await send(context, context.params.file, { root: process.env.UPLOAD_DIR })
})

routes.get('/dependencies', async (context, next) => {
  const dependencyGraph = require('@things-factory/env/lib/dependency-graph')

  await context.render('dependencies-view-graphviz', { model: dependencyGraph })
})

routes.get(
  '/graphql-voyager',
  voyagerMiddleware({
    endpointUrl: '/graphql'
  })
)
