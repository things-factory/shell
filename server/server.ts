process.env.NODE_ENV = 'production'
process.setMaxListeners(0)

import Koa from 'koa'
import cors from 'koa2-cors'
import koaStatic from 'koa-static'
import koaBodyParser from 'koa-bodyparser'
import { historyApiFallback } from 'koa2-connect-history-api-fallback'

import { ApolloServer } from 'apollo-server-koa'
import { graphqlUploadKoa } from 'graphql-upload'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import { config, logger } from '@things-factory/env'

import { databaseInitializer } from './initializers/database'
import {
  globalPublicRouter,
  globalPrivateRouter,
  domainPublicRouter,
  domainPrivateRouter,
  fileDownloadRouter,
  notificationRouter
} from './routers'
import { schema } from './schema'
import { pubsub } from './pubsub'
import './middlewares'

const args = require('args')

args.option('port', 'The port on which the app will be running', config.get('port', 3000))

const flags = args.parse(process.argv)

const path = require('path')

const PORT = (process.env.PORT = flags.port)

const UPLOAD_DIR = (process.env.UPLOAD_DIR = config.getPath('uploads', 'uploads'))

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

/* bootstrap */
const bootstrap = async () => {
  await databaseInitializer()

  const app = new Koa()

  app.use(
    cors({
      origin: function (ctx) {
        var origin = ctx.request.headers.origin
        if (origin) {
          return origin
        } else {
          return '*'
        }
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    })
  )

  app.on('error', (err, ctx) => {
    logger.error(err)

    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
     */
  })

  /* history fallback */
  var fallbackOption = {
    whiteList: [
      `^\/(${[
        'graphql',
        'graphiql',
        'file',
        'uploads',
        'dependencies',
        'licenses',
        'vapidPublicKey',
        'register',
        'unregister',
        'request-notification'
      ].join('|')})($|[/?#])`
    ]
  }
  process.emit('bootstrap-module-history-fallback' as any, app, fallbackOption)
  app.use(historyApiFallback(fallbackOption))

  /* authentication error handling */
  app.use(async (ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message
        }
      } else {
        throw err
      }
    })
  })

  const server = new ApolloServer({
    schema,
    subscriptions: {
      path: '/subscriptions'
    },
    formatError: error => {
      logger.error(error)
      return error
    },
    formatResponse: response => {
      logger.info('response %s', JSON.stringify(response, null, 2))
      return response
    },
    context: ({ ctx }) => ctx
  })

  process.emit('bootstrap-module-middleware' as any, app as any)

  const render = require('koa-ejs-remote')
  render(app, {
    root: '/views',
    host: `http://127.0.0.1:${PORT}`,
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
  })

  app.use(koaBodyParser(bodyParserOption))

  /* jwt 인증에 graphql middleware를 포함하기 위해서 jwt 인증 설정 다음에 둔다. */
  // server.applyMiddleware({
  //   app
  // })

  // app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))
  app.use(
    koaStatic(path.join(process.cwd(), 'dist-client'), {
      index: 'index.html'
    })
  )

  /* routers */
  process.emit('bootstrap-module-global-public-route' as any, app, globalPublicRouter)
  process.emit('bootstrap-module-global-private-route' as any, app, globalPrivateRouter)
  process.emit('bootstrap-module-route' as any, app, domainPublicRouter) // TODO deprecate
  process.emit('bootstrap-module-domain-public-route' as any, app, domainPublicRouter)
  process.emit('bootstrap-module-domain-private-route' as any, app, domainPrivateRouter)

  globalPublicRouter.use('', notificationRouter.routes(), notificationRouter.allowedMethods())
  globalPrivateRouter.use('/file', fileDownloadRouter.routes(), fileDownloadRouter.allowedMethods())
  domainPrivateRouter.use('/graphiql', server.getMiddleware())
  domainPrivateRouter.use('/graphql', server.getMiddleware())
  domainPrivateRouter.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))

  app
    .use(globalPublicRouter.routes())
    .use(globalPublicRouter.allowedMethods())
    .use(globalPrivateRouter.routes())
    .use(globalPrivateRouter.allowedMethods())
    .use(domainPublicRouter.routes())
    .use(domainPublicRouter.allowedMethods())
    .use(domainPrivateRouter.routes())
    .use(domainPrivateRouter.allowedMethods())

  const httpServer = app.listen({ port: PORT }, () => {
    logger.info(`🚀 Server ready at http://0.0.0.0:${PORT}${server.graphqlPath}`)
    logger.info(`🚀 Subscriptions ready at ws://0.0.0.0:${PORT}${server.subscriptionsPath}`)

    process.emit('bootstrap-module-start' as any, { app, config, schema, httpServer } as any)
  })

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: '/subscriptions'
    }
  )
}

bootstrap()
