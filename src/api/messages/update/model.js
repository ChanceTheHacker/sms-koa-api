const db = require('database')

exports.initialize = async function ( id ) {
  return db.query (
    `
    SELECT * FROM messages
    WHERE user_id = $1
    `, 
    [id]
  )
}

exports.sync = async function (tracking, id) {
  return db.query (
    `
    SELECT * FROM messages
    WHERE tracking > $1
    AND user_id = $2
    `, 
    [tracking, id]
  )
}