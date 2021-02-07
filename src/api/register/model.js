const db = require('database')

exports.create = async function (email, hash) {
  return db.queryOne (
    `
    INSERT INTO users (email, hash) 
    VALUES ($1, $2) RETURNING id
    `, 
    [email, hash]
  )
}

exports.firstMessage = async function (id) {
  const from = process.env.TWILIO_PHONE_NUMBER
  const to = process.env.TWILIO_PHONE_NUMBER 
  const nickname = "CityGro" 
  const message = "Welcome"
  return db.queryOne (
    `
    INSERT INTO messages (user_id, from_phone, to_phone, nickname, message) 
    VALUES ($1, $2, $3, $4, $5) RETURNING user_id
    `, 
    [id, from, to, nickname, message]
  )
}