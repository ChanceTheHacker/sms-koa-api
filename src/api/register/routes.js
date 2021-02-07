const Router = require('koa-router')
const controller = require('./controller')

const router = Router()
router.post('/', async ctx => {
  const { email, password } = ctx.request.body
  if (!email || !password){
    ctx.status = 400
    ctx.body = "Missing Credentials"
  } else {
    const id = await controller.create(email, password)
    ctx.status = 200
    ctx.body = id
  }
})

module.exports = router