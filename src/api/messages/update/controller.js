const update = require('./model')

exports.initialize = async function (id) {
  return await update.initialize(id)
}

exports.sync = async function (tracking, id) {
  return await update.sync(tracking, id)
}