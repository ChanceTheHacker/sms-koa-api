const update = require('./model')

// this breaks up the messages into objects grouped by the phone number
// Probably should have just made new tables for each message to begin with
// now dealing with lots of slow sorting and frustrations
// Really regret doing this and needs to be fixed in future...
const formatMessages = (m) => {
  let lastUsedIndex = 0
  let tracking = 0
  const conversations = {}

  // sort them so it's easy to group
  m.sort(function(a, b){
    return a - b
  })

  // map through all the messages sorted by their convo ID
  // if the next message in array has a different convo ID, 
  // split array into it's own object

  m.map ((message, index, array) => {
    // update tracking if it's higher
    tracking = (parseInt(message.tracking) > parseInt(tracking)) ? message.tracking : tracking

    // check if it's last item in array, if it's last complete the split
    if (index + 1 === array.length){
      conversations.convoId = {
        convoId: message.convo_id,
        nickname: message.nickname ? message.nickname : message.convo_id,
        messages: array.slice(lastUsedIndex)
      }
      return conversations
      // if it's not last item split or continue
    } else if ( message.convo_id !== array[index+1].convo_id ) {
        conversations.push({
          convoId: message.convo_id,
          nickname: message.nickname ? message.nickname : message.convo_id,
          messages: array.slice(lastUsedIndex, index+1)
        })
        lastUsedIndex = index + 1
    } else {}
  })
  return conversations
}

exports.initialize = async function (id) {
  const messages = await update.initialize(id)
  return formatMessages(messages)
}

exports.sync = async function (tracking, id) {
  const messages = await update.sync(tracking, id)
  return formatMessages(messages)
}