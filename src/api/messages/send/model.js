const db = require('database')

exports.send = async function (id, to, nickname, message) {
  const from = process.env.TWILIO_PHONE_NUMBER 
  return db.queryOne (
    `
    INSERT INTO messages (user_id, from_phone, to_phone, nickname, message, convo_id) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, 
    [id, from, to, nickname, message, to]
  )
}

// basic check on that the ID exists. Not really a good solution or secure
// just proof on concept. Ideally there should be oauth tokens and each user would
// have their own number that would need to be checked.
exports.validateId = async function ( id ) {
  return db.query (
    `
    SELECT id FROM users
    WHERE id = $1
    `, 
    [id]
  )
}