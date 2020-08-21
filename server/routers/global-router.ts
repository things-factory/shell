import { koa as voyagerMiddleware } from 'graphql-voyager/middleware'
import Router from 'koa-router'

var crawler = require('npm-license-crawler')

export const globalPublicRouter = new Router()
export const globalPrivateRouter = new Router()

globalPublicRouter.get('/dependencies', async (context, next) => {
  const dependencyGraph = require('@things-factory/env/lib/dependency-graph')

  await context.render('dependencies-view-graphviz', { model: dependencyGraph })
})

globalPublicRouter.get(
  '/graphql-voyager',
  voyagerMiddleware({
    endpointUrl: '/graphiql'
  })
)

globalPublicRouter.get('/licenses', (context, next) => {
  return new Promise(function (resolve, reject) {
    var options = {
      start: ['.'],
      exclude: ['./node_modules/@things-factory'],
      noColor: true,
      production: true,
      unknown: false
    }

    crawler.dumpLicenses(options, function (error, res) {
      if (error) {
        console.error('Error:', error)
        reject(error)
      } else {
        context.type = 'application/json'
        context.body = res
        resolve()
      }
    })
  })
})
