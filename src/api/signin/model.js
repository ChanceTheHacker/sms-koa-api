const db = require('database')

exports.returnHash = async function ( email ) {
  return db.queryOne (
    `
    SELECT hash FROM users
    WHERE email::text = $1
    `, 
    [email]
  )
}

exports.attempt = async function (email) {
  return db.queryOne (
    `
    SELECT id FROM users
    WHERE email::text = $1
    `, 
    [email]
  )
}