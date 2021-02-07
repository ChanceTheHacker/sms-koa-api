const db = require('database')

exports.receive = async function (id, from, nickname = from, message) {
  const to = process.env.TWILIO_PHONE_NUMBER 
  return db.queryOne (
    `
    INSERT INTO messages (user_id, from_phone, to_phone, nickname, message, convo_id) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id
    `, 
    [id, from, to, nickname, message, from]
  )
}

exports.provideFirstUserId = async function () {
  return db.queryOne (
        `
        SELECT id FROM users
        `, 
        []
      )
    }