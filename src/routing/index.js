const Router = require('koa-router')
const { db } = require('database')
const signin = require('api/signin/routes')
const register = require('api/register/routes')
const update = require('api/messages/update/routes')
const receive = require('api/messages/receive/routes')
const send = require('api/messages/send/routes')

const router = Router()

router.get('/', async ctx => {
  ctx.status = 200
})

router.use('/signin', signin.routes())

router.use('/register', register.routes())

router.use('/messages/update', update.routes())

router.use('/messages/receive', receive.routes())

router.use('/messages/send', send.routes())

module.exports = router