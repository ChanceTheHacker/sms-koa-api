const Router = require('koa-router')
const controller = require('./controller')

const router = Router()
router.post('/', async ctx => {
  const { From , Body: message, nickname} = ctx.request.body
  const from = str_replace("+", "", From)
  const success = await controller.receive(from, nickname, message)
  if (success){
    // if you give a response, twilio replies to the text with it...
    // because of this there is no confirmation of success
    // ctx.status = 200
    // ctx.body = "Success"
  } else {
    ctx.status = 400
    ctx.body = "Failure"
  }
})

module.exports = router