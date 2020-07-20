process.env.NODE_ENV = 'development'
process.setMaxListeners(0)

import { config, logger } from '@things-factory/env'
import { ThingsFactoryErrorFactory } from '@things-factory/error'
import { ApolloServer } from 'apollo-server-koa'
import { execute, GraphQLError, subscribe } from 'graphql'
import { graphqlUploadKoa } from 'graphql-upload'
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import koaWebpack from 'koa-webpack'
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import cors from 'koa2-cors'
import 'reflect-metadata'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import * as TypeGraphQL from 'type-graphql'
import { Container } from 'typedi'
import * as TypeORM from 'typeorm'
import { databaseInitializer } from './initializers/database'
import './middlewares'
import { resolvers } from './resolvers'
import { routes } from './routes'

TypeORM.useContainer(Container)

const args = require('args')

args.option('port', 'The port on which the app will be running', config.get('port', 3000))
args.option(
  'inspect',
  'The address on which the inspection will be running. Used in development mode only.',
  config.get('inspect', ':9229')
)

const flags = args.parse(process.argv)

const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.dev.js')

const compiler = webpack(webpackConfig)

const PORT = (process.env.PORT = flags.port)

const UPLOAD_DIR = (process.env.UPLOAD_DIR = config.getPath('uploads', 'uploads'))

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

const errorFactory = ThingsFactoryErrorFactory.getInstance()

/* bootstrap */
const bootstrap = async () => {
  await databaseInitializer()

  const schema = await TypeGraphQL.buildSchema({
    resolvers: [...resolvers] as TypeGraphQL.NonEmptyArray<Function>,
    container: Container
  })

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
    formatError: (error: GraphQLError) => {
      logger.error(error)
      const { extensions } = error
      const customError = errorFactory.create(extensions.code, error)
      return customError
    },
    formatResponse: response => {
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
    debug: true
  })

  koaWebpack({
    compiler,
    hotClient: {},
    devMiddleware: {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }
  }).then(middleware => {
    app.use(middleware)

    app.use(koaBodyParser(bodyParserOption))

    /* jwt 인증에 graphql middleware를 포함하기 위해서 jwt 인증 설정 다음에 둔다. */
    server.applyMiddleware({
      app
    })

    /* 개발 환경에서는 두개의 graphql path를 둔다.
      /graphql : application 에서 사용.
      /graphiql : graphql test UI 에서 사용.

      /graphql 을 test UI에서 시도하면, authcheck 대상에 해당되어, 미인증 이유로 테스트가 불가능하기 때문이다.
    */
    server.applyMiddleware({
      path: '/graphiql',
      app
    })

    app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }))

    app.use(
      koaStatic(path.join(webpackConfig.output.path), {
        index: false
      })
    )

    process.emit('bootstrap-module-route' as any, app, routes)

    app.use(routes.routes())
    app.use(routes.allowedMethods())

    const httpServer = app.listen({ port: PORT }, () => {
      logger.info(`🚀 Server ready at http://0.0.0.0:${PORT}${server.graphqlPath}`)
      logger.info(`🚀 Subscriptions ready at ws://0.0.0.0:${PORT}${server.subscriptionsPath}`)

      process.emit('bootstrap-module-start' as any, { app, config, schema, httpServer } as any)
    })

    SubscriptionServer.create(
      {
        schema,
        execute: execute as any,
        subscribe: subscribe as any
      },
      {
        server: httpServer,
        path: '/subscriptions'
      }
    )
  })
}

bootstrap()
