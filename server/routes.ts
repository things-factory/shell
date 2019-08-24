import Router from 'koa-router'
const send = require('koa-send')
var crawler = require('npm-license-crawler')

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
    endpointUrl: '/graphiql'
  })
)

routes.get('/licenses', (context, next) => {
  return new Promise(function(resolve, reject) {
    var options = {
      start: ['.'],
      exclude: ['./node_modules/@things-factory'],
      // json: 'licenses.json',
      noColor: true,
      production: true,
      unknown: false
    }

    crawler.dumpLicenses(options, function(error, res) {
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
