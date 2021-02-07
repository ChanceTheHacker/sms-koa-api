const Router = require('koa-router')
const controller = require('./controller')

const router = Router()
router.post('/', async ctx => {
  const { id, to, nickname = "", message } = ctx.request.body
  const success = await controller.send(id, to, nickname, message)
  if (success){
    ctx.status = 200
    ctx.body = "Success"
  } else {
    ctx.status = 400
    ctx.body = "Failure"
  }
})

module.exports = router