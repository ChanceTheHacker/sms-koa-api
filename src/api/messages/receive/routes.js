const Router = require('koa-router')
const controller = require('./controller')

const router = Router()
router.post('/', async ctx => {
  const { from, Body: message, nickname} = ctx.request.body
  const success = await controller.receive(from, nickname, message)
  if (success){
    // if you give a response, twilio replies to the text with it...
    // ctx.status = 200
    // ctx.body = "Success"
  } else {
    ctx.status = 400
    ctx.body = "Failure"
  }
})

module.exports = router