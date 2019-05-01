import Router from 'koa-router'
import koaBodyParser from 'koa-bodyparser'
const send = require('koa-send')

import { screenshot } from './controllers/screenshot'
import { pdf } from './controllers/pdf'
import { thumbnail } from './controllers/thumbnail'
import { headless } from './controllers/headless'
import { screencast } from './controllers/screencast'
import { labelcommand } from './controllers/label-command'

import { signup, signin, authcheck } from './controllers/auth'

// import { authMiddleware } from './middlewares/auth-middleware'
const MAX_AGE = 7 * 24 * 3600 * 1000

export const routes = new Router()

const bodyParserOption = {
  formLimit: '10mb',
  jsonLimit: '10mb',
  textLimit: '10mb'
}

// Send index.html when the user access the web
const path = require('path')
const root = path.join(__dirname, '..')

// routes.use('/', authMiddleware)

// for authentication
routes.post('/signup', koaBodyParser(bodyParserOption), async (context, next) => {
  try {
    let user = context.request.body
    let token = await signup(user)

    context.body = {
      message: 'registered successfully',
      token
    }

    context.cookies.set('access_token', token, {
      httpOnly: false,
      maxAge: MAX_AGE
    })
  } catch (e) {
    context.status = 401
    context.body = {
      message: e.message
    }
  }
})

routes.post('/signin', koaBodyParser(bodyParserOption), async (context, next) => {
  try {
    let user = context.request.body
    let token = await signin(user)

    context.body = {
      message: 'signin successfully',
      token
    }

    context.cookies.set('access_token', token, {
      httpOnly: false,
      maxAge: MAX_AGE
    })
  } catch (e) {
    context.status = 401
    context.body = {
      message: e.message
    }
  }
})

routes.get('/authcheck', async (context, next) => {
  try {
    // 새로운 토큰 발급
    var token = await authcheck(context.state.user.email)

    context.cookies.set('access_token', token, {
      httpOnly: false,
      maxAge: MAX_AGE
    })

    context.body = {
      message: 'token checked successfully',
      token,
      user: context.state.user // jwt-koa or authMiddleware will set context.state.token, user
    }
  } catch (e) {
    context.status = 401
    context.body = {
      message: e.message
    }
  }
})

// for board view only
routes.post('/headless-board-view', koaBodyParser(bodyParserOption), async (context, next) => {
  let model = context.request.body
  await context.render('headless-board-view', { model })
})

// for board headless
routes.get('/headless/:id', async (context, next) => {
  let id = context.params.id
  let model = await headless({ id })

  await context.render('headless-board-view', { model })
})

// for board screencast
routes.get('/screencast/:id', async (context, next) => {
  let id = context.params.id
  await screencast({ id })
  await send(context, 'output.webm', { root })
})

// for board thumbnail
routes.get('/thumbnail/:id', async (context, next) => {
  let id = context.params.id
  let data = Object.keys(context.query).length ? context.query : null

  context.type = 'image/png'
  context.body = await thumbnail({ id, data, options: { encoding: 'binary', type: 'png' } })
})

// for webpage scrap
routes.get('/screenshot/:id', async (context, next) => {
  let id = context.params.id
  let data = Object.keys(context.query).length ? context.query : null

  context.type = 'image/png'
  context.body = await screenshot({ id, data, options: { encoding: 'binary', type: 'png' } })
})

// for webpage scrap
routes.get('/pdf/:id', async (context, next) => {
  let id = context.params.id
  let data = Object.keys(context.query).length ? context.query : null

  context.type = 'application/pdf'
  context.body = await pdf({
    id,
    data,
    options: {
      format: 'A4'
    }
  })
})

// for webpage scrap => zpl image print(grf format) command
routes.get('/label-command/:id', async (context, next) => {
  let id = context.params.id
  let data = Object.keys(context.query).length ? context.query : null

  context.type = 'text/plain'
  context.body = await labelcommand(id, data)
})

routes.post('/label-command/:id', koaBodyParser(bodyParserOption), async (context, next) => {
  let model = context.request.body
  await context.render('label-command', { model })
})

// for providing resource
routes.get('/file/:file', async (context, next) => {
  await send(context, context.params.file, { root: process.env.UPLOAD_DIR })
})
