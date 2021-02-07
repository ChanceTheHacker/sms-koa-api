const registration = require('./model')
const bcrypt = require('bcryptjs')

exports.create = async function (email, password) {
  const hash = bcrypt.hashSync(password)
  const { id } = await registration.create(email, hash)
  await registration.firstMessage(id)
  return id
}