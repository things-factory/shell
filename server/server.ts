process.setMaxListeners(0)

import Koa from 'koa'
import cors from 'koa2-cors'

import { ApolloServer } from 'apollo-server-koa'
import koaBodyParser from 'koa-bodyparser'

// @ts-ignore
import { graphqlUploadKoa } from 'graphql-upload'
import { databaseInitializer } from './initializers/database'
import { routes } from './routes'
import { schema } from './schema'
import { config } from '@things-factory/env'

const koaStatic = require('koa-static')
import { historyApiFallback } from 'koa2-connect-history-api-fallback'

const args = require('args')

process.env.NODE_ENV = 'production'
config.build()

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

const { context } = require('./server-context')

/* bootstrap */
const bootstrap = async () => {
  await databaseInitializer()

  const app = new Koa()

  app.use(
    cors({
      origin: function(ctx) {
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
    console.log('error ===>', err)

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
    ].map(path => `^\/${path}($|[/?#])`)
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
    context
  })

  process.emit('bootstrap-module-middleware' as any, app as any)

  const render = require('koa-ejs-remote')
  render(app, {
    root: '/views',
    host: `http://127.0.0.1:${PORT}`,
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
  })

  app.use(koaBodyParser(bodyParserOption))

  /* jwt 인증에 graphql middleware를 포함하기 위해서 jwt 인증 설정 다음에 둔다. */
  server.applyMiddleware({
    app
  })

  app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))
  app.use(
    koaStatic(path.join(process.cwd(), 'dist-client'), {
      index: 'index.html'
    })
  )

  process.emit('bootstrap-module-route' as any, app, routes)

  app.use(routes.routes())
  app.use(routes.allowedMethods())

  app.listen({ port: PORT }, () => console.log(`\n🚀  Server ready at http://0.0.0.0:${PORT}\n`))
}

bootstrap()
