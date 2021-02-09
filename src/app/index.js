const Koa = require('koa')
const router = require('routing')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const ResponseTime = require('koa-response-time')
const db = require('database')
// Didn't implement oauth since this is just a dummy app
// Did include password encryption, but probably should have left it out too
// const oauthserver = require('koa-oauth-server');
// next time probably just fork this https://github.com/mlaccetti/koa-knex-realworld-heroku-example

const port = process.env.PORT || 3030;

const app = new Koa()

app.use(bodyParser());
app.use(cors());
app.use(ResponseTime())
app.use(router.routes())

exports.start = async function () {
  try{
    await db.start()
    console.log('db started')
    await app.listen(port)
    console.log(`We're live on ${port}`)
  } catch (error) {
    console.log(error)
  }
}

exports.close = async function() {
  await this.server.close()
  await db.close()
  console.log('closed')
}