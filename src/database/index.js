const { Pool } = require('pg')
const migrate = require('./migrations')

exports.start = async function () {
  const host = process.env.DATABASE_URL
  const user = process.env.PGUSER
  const port = parseInt(process.env.PGPORT)
  const password = process.env.PGPASSWORD
  const database = process.env.PGDATABASE
  
  this.pool = new Pool({ user, host, database, password, port })
  this.client = await this.pool.connect()
  await migrate.run(this.client)
}

exports.close = async function () {
  await this.client.release()
}

exports.query = async function (q, data) {
  return this.client.query(q, data).then(r => r.rows)
}

exports.queryOne = async function(q, data) {
  return this.client.query(q, data).then(r => r.rows[0])
}