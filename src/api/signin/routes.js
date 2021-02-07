const Router = require('koa-router')
const controller = require('./controller')

const router = Router()
router.post('/', async ctx => {
  const { email, password} = ctx.request.body
  const id = await controller.attempt(email, password)
  if (id){
    ctx.status = 200
    ctx.body = id
  } else {
    ctx.status = 400
    ctx.body = "Login Failed"
  }
})

module.exports = router