const update = require('./model')

// this breaks up the messages into objects grouped by the phone number
// Probably should have just made new tables for each message to begin with
// now dealing with lots of slow sorting and frustrations
// Really regret doing this and needs to be fixed in future...
const formatMessages = (messages) => {
  messages.map (message => message)
}

exports.initialize = async function (id) {
  const messages = await update.initialize(id)
  return formatMessages(messages)
}

exports.sync = async function (tracking, id) {
  const messages = await update.sync(tracking, id)
  return formatMessages(messages)
}