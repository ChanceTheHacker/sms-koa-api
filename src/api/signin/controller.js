const login = require('./model')
const bcrypt = require('bcryptjs')

exports.attempt = async function (email, password) {
  const { hash } = await login.returnHash(email)
  const isValid = await bcrypt.compareSync(password, hash)
  if (isValid) {
    return await login.attempt(email)
  } else {
    return false
  }
}