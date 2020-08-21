import Router from 'koa-router'
import {
  getVapidPublicKey,
  register,
  sendNotification,
  sendNotificationToAll,
  unregister
} from '../controllers/notifications'

export const notificationRouter = new Router()

notificationRouter.all('(.*)', async (context, next) => {
  sendNotificationToAll()
  return next()
})

notificationRouter.get('/vapidPublicKey', async (context, next) => {
  context.body = getVapidPublicKey()
})

notificationRouter.post('/register', async (context, next) => {
  await register({
    request: context.request
  })
  context.status = 201
})

notificationRouter.post('/unregister', async (context, next) => {
  await unregister(context.request)
  context.status = 201
})

notificationRouter.post('/request-notification', async (context, next) => {
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
