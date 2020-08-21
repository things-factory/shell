import Router from 'koa-router'
const send = require('koa-send')

export const fileDownloadRouter = new Router()

fileDownloadRouter.get('/:file', async (context, next) => {
  await send(context, context.params.file, { root: process.env.UPLOAD_DIR })
})
