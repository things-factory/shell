const Koa = require('koa')

const koaWebpack = require('koa-webpack')
const koaApiFallback = require('koa-history-api-fallback')
const args = require('args')

args.option('port', 'The port on which the app will be running', 3000)

const flags = args.parse(process.argv)

const path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config.dev.js')

const compiler = webpack(config)

const PORT = (process.env.PORT = flags.port)
const FACTORY_MODULE_ROOT_DIR = path.join(__dirname, '..')

const bootstrap = async () => {
  const app = new Koa()

  koaWebpack({
    compiler,
    hotClient: {},
    devMiddleware: {
      publicPath: '/dist',
      stats: { colors: true }
    }
  }).then(middleware => {
    app.use(middleware)
    app.use(koaApiFallback())

    app.use(require('koa-static')('/'))
    app.use(require('koa-static')(FACTORY_MODULE_ROOT_DIR))

    app.listen(PORT)
  })
}

bootstrap()
