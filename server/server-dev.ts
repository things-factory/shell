import Koa from 'koa'
import cors from 'koa2-cors'

import { ApolloServer } from 'apollo-server-koa'
import koaBodyParser from 'koa-bodyparser'
import unless from 'koa-unless'

// @ts-ignore
import { graphqlUploadKoa } from 'graphql-upload'
import { databaseInitializer } from './initializers/database'
import { routes } from './routes'
import { schema } from './graphql/schema'

import { authMiddleware } from './middlewares/auth-middleware'
;(authMiddleware as any).unless = unless

const koaWebpack = require('koa-webpack')
const koaStatic = require('koa-static')
const args = require('args')

args.option('port', 'The port on which the app will be running', 3000)

const flags = args.parse(process.argv)

const path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config.dev.js')

const compiler = webpack(config)

const PORT = (process.env.PORT = flags.port)
const SHELL_MODULE_ROOT_DIR = path.join(__dirname, '..')

const UPLOAD_DIR = (process.env.UPLOAD_DIR = path.join(process.cwd(), 'uploads'))

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

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

  const server = new ApolloServer({ schema })

  const render = require('koa-ejs')
  render(app, {
    root: path.join(__dirname, '..', 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false
  })

  koaWebpack({
    compiler,
    hotClient: {},
    devMiddleware: {
      publicPath: config.output.publicPath,
      stats: { colors: true }
    }
  }).then(middleware => {
    app.use(middleware)

    app.use(koaBodyParser(bodyParserOption))

    app.use(
      (authMiddleware as any).unless({ path: [/^(?!.graphql|.file|.uploads|.authcheck).*$/] })
      /* 위의 path로 시작하는 경우에만, authcheck를 한다. */
    )

    /* jwt 인증에 graphql middleware를 포함하기 위해서 jwt 인증 설정 다음에 둔다. */
    server.applyMiddleware({
      path: '/graphiql',
      app
    })

    app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))

    app.use(koaStatic(path.join(config.output.path, '..')))
    app.use(koaStatic(SHELL_MODULE_ROOT_DIR))

    app.use(routes.routes())
    app.use(routes.allowedMethods())

    app.listen(PORT)
  })
}

bootstrap()