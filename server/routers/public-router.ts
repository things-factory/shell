import { koa as voyagerMiddleware } from 'graphql-voyager/middleware'
import koaBodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import {
  getVapidPublicKey,
  register,
  sendNotification,
  sendNotificationToAll,
  unregister
} from '../controllers/notifications'

const send = require('koa-send')
var crawler = require('npm-license-crawler')

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

export const publicRouter = new Router()

publicRouter.get('/dependencies', async (context, next) => {
  const dependencyGraph = require('@things-factory/env/lib/dependency-graph')

  await context.render('dependencies-view-graphviz', { model: dependencyGraph })
})

publicRouter.get(
  '/graphql-voyager',
  voyagerMiddleware({
    endpointUrl: '/graphiql'
  })
)

publicRouter.get('/licenses', (context, next) => {
  return new Promise(function (resolve, reject) {
    var options = {
      start: ['.'],
      exclude: ['./node_modules/@things-factory'],
      // json: 'licenses.json',
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

publicRouter.all('(.*)', async (context, next) => {
  sendNotificationToAll()
  return next()
})

publicRouter.get('/vapidPublicKey', async (context, next) => {
  context.body = getVapidPublicKey()
})

publicRouter.post('/register', koaBodyParser(bodyParserOption), async (context, next) => {
  await register({
    request: context.request
  })
  context.status = 201
})

publicRouter.post('/unregister', async (context, next) => {
  await unregister(context.request)
  context.status = 201
})

publicRouter.post('/request-notification', koaBodyParser(bodyParserOption), async (context, next) => {
  var { receivers = [], message, url, title } = context.request.body

  var msg = {
    ...context.request.body,
    title,
    body: message,
    url: url || context.request.href
  }

  receivers.forEach(receiver => {
    sendNotification({
      receiver,
      message: JSON.stringify(msg)
    })
  })

  context.body = {
    success: true
  }
})
