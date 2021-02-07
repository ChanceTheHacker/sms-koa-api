const db = require('database')

exports.receive = async function (id, from, nickname, message) {
  const to = process.env.TWILIO_PHONE_NUMBER 
  return db.queryOne (
    `
    INSERT INTO messages (user_id, from_phone, to_phone, nickname, message) 
    VALUES ($1, $2, $3, $4, $5) RETURNING user_id
    `, 
    [id, from, to, nickname, message]
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