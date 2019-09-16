import { koa as voyagerMiddleware } from 'graphql-voyager/middleware'
import Router from 'koa-router'
import { getVapidPublicKey, register, sendNotification, unregister } from './controllers/notifications'
const send = require('koa-send')
var crawler = require('npm-license-crawler')

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

routes.get('/vapidPublicKey', async (context, next) => {
  context.body = getVapidPublicKey()
})

routes.post('/register', async (context, next) => {
  register(context.request)
  context.status = 201
})

routes.post('/unregister', async (context, next) => {
  unregister(context.request)
  context.status = 201
})

routes.get('/request-notification/:message', async (context, next) => {
  sendNotification(context.params.message)
  context.body = {
    success: true
  }
})
