const Router = require('koa-router')
const send = require('koa-send')
const routes = new Router()

module.exports = routes

// Send index.html when the user access the web
const path = require('path')
const root = path.join(__dirname, '..')

routes.get('/', async (context, next) => {
  await send(context, 'index.html', { root })
})
