import Koa from 'koa'
import cors from 'koa2-cors'

import { ApolloServer } from 'apollo-server-koa'
import koaBodyParser from 'koa-bodyparser'
import unless from 'koa-unless'

// @ts-ignore
import { graphqlUploadKoa } from 'graphql-upload'
import { databaseInitializer } from './initializers/database'
import { routes } from './routes'
import { schema } from './schema'

// import { authMiddleware } from './middlewares/auth-middleware'
// ;(authMiddleware as any).unless = unless

const koaStatic = require('koa-static')
import { historyApiFallback } from 'koa2-connect-history-api-fallback'

const args = require('args')

args.option('port', 'The port on which the app will be running', 3000)

const flags = args.parse(process.argv)

const path = require('path')

const PORT = (process.env.PORT = flags.port)

const UPLOAD_DIR = (process.env.UPLOAD_DIR = path.join(process.cwd(), 'uploads'))

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

const { context } = require('./server-context')

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
    whiteList: ['/graphql', '/graphiql', '/file', '/uploads', '/authcheck', '/thumbnail']
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

  const render = require('koa-ejs')
  render(app, {
    root: path.join(__dirname, '..', 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false
  })

  app.use(koaBodyParser(bodyParserOption))

  process.emit('bootstrap-module-middleware' as any, app as any)

  /* dependency 역순으로 middleware 를 적용한다. */
  const orderedModuleNames = require('@things-factory/env').orderedModuleNames
  orderedModuleNames.reverse().forEach(dep => {
    try {
      let mod = require(dep)

      if (mod.middlewares) {
        mod.middlewares.forEach(middleware => {
          app.use(middleware)
        })
      }
    } catch (e) {
      console.error(e)
    }
  })

  // app.use(
  //   (authMiddleware as any).unless({
  //     path: [/^(?!.graphql|.file|.uploads|.authcheck).*$/]
  //   })
  //   /* 위의 path로 시작하는 경우에만, authcheck를 한다. */
  // )

  /* jwt 인증에 graphql middleware를 포함하기 위해서 jwt 인증 설정 다음에 둔다. */
  server.applyMiddleware({
    app
  })

  app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))
  app.use(koaStatic(path.join(process.cwd(), 'dist-client')))

  process.emit('bootstrap-module-route' as any, app, routes)

  /* dependency 역순으로 routes 를 적용한다. */
  orderedModuleNames.reverse().forEach(dep => {
    try {
      let mod = require(dep)

      if (mod.routes) {
        app.use(mod.routes.routes())
        app.use(mod.routes.allowedMethods())
      }
    } catch (e) {
      console.error(e)
    }
  })

  app.use(routes.routes())
  app.use(routes.allowedMethods())

  app.listen({ port: PORT }, () => console.log(`\n🚀  Server ready at http://0.0.0.0:${PORT}\n`))
}

bootstrap()
