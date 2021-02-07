const update = require('./model')

// function compare(a, b) {
//   if (a.convo_id < b.convo_id) {
//     return -1;
//   }
//   if (a.convo_id > b.convo_id ) {
//     return 1;
//   }
//   // a must be equal to b
//   return 0;
// }

// this breaks up the messages into objects grouped by the phone number
// Probably should have just made new tables for each message to begin with
// now dealing with lots of slow sorting and frustrations
// Really regret doing this and needs to be fixed in future...
const formatMessages = (m) => {
  let lastUsedIndex = 0
  const conversations = []
  m.sort(function(a, b){
    console.log(a)
    console.log(b)
    return a - b
  })
  // map through all the messages sorted by their convo ID
  // if the next message in array has a different convo ID, 
  // split array into it's own object

  m.map ((message, index, array) => {
    // check if it's last item in array, if it's last complete the split
    if (index + 1 > array.length){
      conversations.push({
        convoId: message.convo_id,
        nickname: message.nickname ? message.nickname : message.convo_id,
        messages: array.slice(lastUsedIndex)
      })
      return conversations
      // if it's not last item split or continue
    } else if ( message.convo_id !== array[index+1].convo_id ) {
        conversations.push({
          convoId: message.convo_id,
          nickname: message.nickname ? message.nickname : message.convo_id,
          messages: array.slice(lastUsedIndex, index+1)
        })
    } else {}
  })
  return m
}

exports.initialize = async function (id) {
  const messages = await update.initialize(id)
  return formatMessages(messages)
}

exports.sync = async function (tracking, id) {
  const messages = await update.sync(tracking, id)
  return formatMessages(messages)
}