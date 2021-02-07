const Router = require('koa-router')
const controller = require('./controller')

const router = Router()

router.post('/initialize', async ctx => {
  const { id } = ctx.request.body
  const messages = await controller.initialize(id)
  if (messages){
    ctx.status = 200
    ctx.body = messages
  } else {
    ctx.status = 400
    ctx.body = "Initialization Failed"
  }
})

router.post('/sync', async ctx => {
  const { tracking, id } = ctx.request.body
  const messages = await controller.sync(tracking, id)
  if (messages){
    ctx.status = 200
    ctx.body = messages
  } else {
    ctx.status = 400
    ctx.body = "Sync Failed"
  }
})

module.exports = router